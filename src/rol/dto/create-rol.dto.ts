import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateRolDto {
    @IsNotBlank({message: 'Name should not be blank'})
    nombre_rol: string;
}