import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { UsuarioEntity } from "../../auth/entities/usuario.entity";

@Entity({name: 'rol'})
export class RolEntity {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    nombre_rol: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.id_rol)
    usuarios: UsuarioEntity[];
}