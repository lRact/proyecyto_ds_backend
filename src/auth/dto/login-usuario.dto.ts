import {IsEmail, IsString, MinLength} from "class-validator";
import {IsNotBlank} from "../../decorators/is-not-blank.decorator";

export class LoginUsuarioDto {
    @IsEmail()
    @IsString()
    @IsNotBlank()
    email: string;

    @IsString()
    @IsNotBlank()
    @MinLength(8)
    password: string;
}