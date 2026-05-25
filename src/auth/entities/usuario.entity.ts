import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RolEntity} from "../../rol/entities/rol.entity";

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

    @ManyToOne(() => RolEntity, rol => rol.usuarios, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'id_rol'})
    rol: RolEntity;

    @Column()
    id_rol: number;
}