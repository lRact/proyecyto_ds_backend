import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'rol'})
export class RolEntity {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    nombre_rol: string;
}