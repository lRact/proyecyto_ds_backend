import {IsNotBlank} from "../../decorators/is-not-blank.decorator";
import {IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class CreateActividadDto {
    @IsString()
    @IsNotBlank()
    nombre_actividad: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_entrega: string;

    @IsNumber()
    @Min(1)
    @Max(10)
    nivel_estres: number;

    @IsBoolean()
    @IsNotEmpty()
    completada?: boolean;

    @IsNumber()
    @IsNotEmpty()
    id_usuario: number;
}