import { IsNotEmpty, IsEnum, IsString, IsOptional, IsBoolean } from "class-validator";
import { ROLES } from "src/constants";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsEnum(ROLES)
    role?: ROLES;

    @IsOptional()
    @IsBoolean()
    enabled?: boolean;
}