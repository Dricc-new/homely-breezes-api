import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO, UpdateTokensDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    public async singIn(@Body() { email, password }: AuthDTO) {
        return await this.authService.singIn(email, password)
    }

    @Post('refresh-token')
    public async refreshToken(@Body() { accessToken, refreshToken }: UpdateTokensDTO) {
        return await this.authService.updateToken(accessToken, refreshToken)
    }
}
