import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ActividadEntity} from "./entities/actividad.entity";
import {MessageDto} from "../common/message.dto";
import {CreateActividadDto} from "./dto/create-actividad.dto";
import {UpdateActividadDto} from "./dto/update-actividad.dto";

@Injectable()
export class ActividadService {
    constructor(
        @InjectRepository(ActividadEntity)
        private actividadRepository: Repository<ActividadEntity>
    ) { }

    async getAll(): Promise<ActividadEntity[]> {
        const list = await this.actividadRepository.find();

        if(!list.length) {
            throw new NotFoundException(new MessageDto('No se encontraron actividades.'))
        }

        return list;
    }

    async getById(id_actividad: number): Promise<ActividadEntity> {
        const actividad = await this.actividadRepository.findOneBy({id_actividad});

        if(!actividad) {
            throw new NotFoundException(new MessageDto('No se encontro la actividad.'))
        }

        return actividad;
    }

    async create(createActividadDto: CreateActividadDto): Promise<MessageDto> {
        await this.actividadRepository.save(createActividadDto);

        return new MessageDto('Actividad creada correctamente.');
    }

    async update(id: number, updateActividadDto: UpdateActividadDto): Promise<MessageDto> {
        await this.actividadRepository.update(id, updateActividadDto);

        return new MessageDto('Actividad actualizada correctamente.');
    }

    async delete(id: number): Promise<MessageDto> {
        await this.actividadRepository.delete(id);

        return new MessageDto('Actividad eliminada correctamente.');
    }
}
