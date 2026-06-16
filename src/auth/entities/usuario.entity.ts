import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AlumnoEntity} from "../../alumno/entities/alumno.entity";
import {ActividadEntity} from "../../actividad/entities/actividad.entity";

@Entity({name: 'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 150, nullable: false})
    nombre: string;

    @Column({type: 'varchar', length: 100, unique: true, nullable: false})
    correo: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    password: string;

    @Column({type: 'varchar', length: 30, nullable: false})
    rol: string;

    @OneToOne(() => AlumnoEntity, alumno => alumno.usuario)
    alumno: AlumnoEntity;

    @OneToMany(() => ActividadEntity, actividad => actividad.usuario, {
        onDelete: 'CASCADE'
    })
    actividad: ActividadEntity
}