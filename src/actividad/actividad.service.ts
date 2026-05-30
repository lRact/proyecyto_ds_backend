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
            throw new NotFoundException(new MessageDto('No activities found'))
        }

        return list;
    }

    async getById(id_actividad: number): Promise<ActividadEntity> {
        const actividad = await this.actividadRepository.findOneBy({id_actividad});

        if(!actividad) {
            throw new NotFoundException(new MessageDto('Activity not found'))
        }

        return actividad;
    }

    async create(createActividadDto: CreateActividadDto): Promise<MessageDto> {
        await this.actividadRepository.save(createActividadDto);

        return new MessageDto('Activity created successfully');
    }

    async update(id: number, updateActividadDto: UpdateActividadDto): Promise<MessageDto> {
        await this.actividadRepository.update(id, updateActividadDto);

        return new MessageDto('Activity updated successfully');
    }

    async delete(id: number): Promise<MessageDto> {
        await this.actividadRepository.delete(id);

        return new MessageDto('Activity deleted successfully');
    }
}
