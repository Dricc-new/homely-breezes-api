import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt'
// import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AccessTokens } from '../interfaces/authTokens.interface';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService) { }

    public async validateUser(email: string, password: string) {
        const userByEmail = await this.userService.findBy({ email })
        if (userByEmail && userByEmail.enabled) {
            const match = await bcrypt.compare(password, userByEmail.password)
            if (match) return userByEmail
        }

        throw new UnauthorizedException('Data no valid')
    }

    // Create a new token; and returns an access token with your refresh token
    private async createToken(payload: JwtPayload): Promise<AccessTokens> {
        // Create accessToken
        const accessToken = this.jwtService.sign(payload)
        // Create a refreshToken
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRE,
        })
        return { accessToken, refreshToken }
    }

    // Refresh accessToken
    public async updateToken(accessToken: string, refreshToken: string): Promise<AccessTokens> {
        try {
            // If this token is not expired I return it
            const payload: JwtPayload = await this.jwtService.verify(accessToken)
            return { accessToken, refreshToken }
        } catch {
            try {
                // I verify that the refresh token is not expired
                const { id, email } = await this.jwtService.verifyAsync(refreshToken, {
                    secret: process.env.JWT_REFRESH_SECRET,
                })

                // I create a new token and return it
                return this.createToken({ id, email })
            } catch (err) {
                throw new UnauthorizedException('Your session has expired')
            }
        }
    }

    public async singIn(email: string, password: string) {
        try {
            const user = await this.validateUser(email, password)
            if (user) {
                const { accessToken, refreshToken } = await this.createToken({ id: user._id.toString(), email: user.email })

                const accessExp = await this.jwtService.verify(accessToken).exp
                const refreshExp = await this.jwtService.verify(refreshToken, {
                    secret: process.env.JWT_REFRESH_SECRET,
                }).exp
                return { user, accessToken, refreshToken, accessExp, refreshExp }
            }
        } catch (err) {
            return err
        }
    }

    public async decode(token: string): Promise<Users | string> {
        try {
            const { id } = await this.jwtService.verify(token)
            const user = await this.userService.findById(id)
            if (!user) return 'Invalid User'

            return user
        } catch (err) {
            if (err.message === 'jwt expired') return 'Token expired'
            return 'Invalid token'
        }
    }
}
