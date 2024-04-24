import { Users } from "src/users/entities/users.entity"

export interface AuthBody {
    email: string
    password: string
}

export interface AuthTokenResult {
    id: string
    email: string
    iat: number
    exp: number
}

export interface IUserToken {
    id: string
    user: Users
    isExpired: boolean
}