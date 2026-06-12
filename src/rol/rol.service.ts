import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import {RolEntity} from "./entities/rol.entity";
import {MessageDto} from "../common/message.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: Repository<RolEntity>,
    ) {}

    async getAll(): Promise<RolEntity[]> {
        const list = await this.rolRepository.find();

        if(!list.length) {
            throw new NotFoundException(new MessageDto('No se encontraron roles.'));
        }

        return list;
    }

    async getById(id: number): Promise <RolEntity> {
        const rol = await this.rolRepository.findOneBy({ id_rol: id });

        if(!rol) {
            throw new NotFoundException(new MessageDto(`Rol no encontrado.`));
        }

        return rol;
    }

    async getByName(nombre: string): Promise<RolEntity | null> {
        return await this.rolRepository.findOneBy({ nombre_rol: nombre });
    }

    async create(dto: CreateRolDto): Promise<any> {
        const exists = await this.getByName(dto.nombre_rol);

        if(exists) {
            throw new BadRequestException(new MessageDto(`El rol ${ dto.nombre_rol } ya existe.`));
        }

        const rol = this.rolRepository.create(dto);
        await this.rolRepository.save(rol);

        return new MessageDto(`Rol ${rol.nombre_rol} creado.`);
    }

    async update(id: number, dto: CreateRolDto): Promise<any> {
        const rol = await this.getById(id);

        if(!rol) {
            throw new BadRequestException(new MessageDto(`Rol con ID ${ id } no encontrado.`));
        }

        const exists = await this.getByName(dto.nombre_rol);
        if(exists && exists.id_rol !== id) {
            throw new BadRequestException(new MessageDto(`El rol ${ dto.nombre_rol } ya existe.`));
        }

        dto.nombre_rol? rol.nombre_rol = dto.nombre_rol : rol.nombre_rol;

        await this.rolRepository.save(rol);

        return new MessageDto(`Rol ${rol.nombre_rol} actualizado.`);
    }

    async delete(id: number): Promise<any> {
        const rol = await this.getById(id);

        if(!rol) {
            throw new BadRequestException(new MessageDto(`Rol con ID ${ id } no encontrado.`));
        }

        await this.rolRepository.remove(rol);

        return new MessageDto(`Rol ${rol.nombre_rol} eliminado.`);
    }
}