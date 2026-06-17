import {Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../../auth/entities/usuario.entity";

@Entity({name: 'actividad'})
@Check(`"nivel_estres" BETWEEN 1 AND 10`)
export class ActividadEntity {
    @PrimaryGeneratedColumn()
    id_actividad: number;

    @Column({type: 'varchar', length: 150, nullable: false})
    nombre_actividad: string;

    @Column({type: 'date', nullable: false})
    fecha_entrega: Date;

    @Column({type: 'integer', nullable: false})
    nivel_estres: number;

    @Column({type: 'boolean', nullable: false, default: false})
    completada?: boolean;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.actividad)
    @JoinColumn({name: 'id_usuario'})
    usuario: UsuarioEntity;

    @Column()
    id_usuario: number;
}