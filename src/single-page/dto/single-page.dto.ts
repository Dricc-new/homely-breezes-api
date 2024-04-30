import { IsNotEmpty, IsEnum, IsString, IsOptional, IsBoolean, IsJSON } from "class-validator";
import { VISIBILITY } from "src/constants/roles";

export class SinglePageDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsJSON()
    data: string;

    @IsOptional()
    @IsEnum(VISIBILITY)
    visibility?: VISIBILITY;
}

export class SinglePageUpdateDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsJSON()
    data?: string;

    @IsOptional()
    @IsEnum(VISIBILITY)
    visibility?: VISIBILITY;
}