import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../../auth/entities/usuario.entity";

@Entity({name: 'alumno'})
export class AlumnoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    carrera: string;

    @Column({type: 'int', nullable: false})
    semestre: number;

    @Column({type: 'varchar', length: 10, nullable: false})
    grupo: string;

    @OneToOne(() => UsuarioEntity, usuario => usuario.alumno, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'id_usuario'})
    usuario: UsuarioEntity;

    @Column()
    id_usuario: number;
}