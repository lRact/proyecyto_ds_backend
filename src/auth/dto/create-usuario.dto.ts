import {IsEmail, IsInt, IsNotEmpty, IsString, MinLength} from "class-validator";
import {IsNotBlank} from "../../decorators/is-not-blank.decorator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotBlank()
    nombre: string;

    @IsEmail()
    correo: string;

    @IsString()
    @IsNotBlank()
    @MinLength(8)
    password: string;

    @IsInt()
    @IsNotEmpty()
    id_rol: number;
}