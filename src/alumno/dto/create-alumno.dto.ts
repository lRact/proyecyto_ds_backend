import {IsInt, IsNotEmpty, IsString} from "class-validator";
import {IsNotBlank} from "../../decorators/is-not-blank.decorator";

export class CreateAlumnoDto {
    @IsString()
    @IsNotBlank()
    carrera: string;

    @IsInt()
    @IsNotEmpty()
    semestre: number;

    @IsString()
    @IsNotBlank()
    grupo: string;

    @IsInt()
    @IsNotEmpty()
    id_usuario: number;
}