import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {AlumnoEntity} from "./entities/alumno.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageDto} from "../common/message.dto";
import {CreateAlumnoDto} from "./dto/create-alumno.dto";
import {UpdateAlumnoDto} from "./dto/update-alumno.dto";

@Injectable()
export class AlumnoService {
    constructor(
        @InjectRepository(AlumnoEntity)
        private alumnoRepository: Repository<AlumnoEntity>
    ) {}

    async getAll(): Promise<AlumnoEntity[]> {
        const list = await this.alumnoRepository.find();

        if(!list.length) {
            throw new NotFoundException(new MessageDto('No se encontraron alumnos.'));
        }

        return list;
    }

    async getById(id: number): Promise<AlumnoEntity> {
        const alumno = await this.alumnoRepository.findOneBy({id});

        if(!alumno) {
            throw new NotFoundException(new MessageDto('Alumno no encontrado.'));
        }

        return alumno;
    }

    async create(createAlumnoDto: CreateAlumnoDto): Promise<MessageDto> {
        await this.alumnoRepository.save(createAlumnoDto);

        return new MessageDto('Alumno creado correctamente.');
    }

    async update(id: number, updateAlumnoDto: UpdateAlumnoDto): Promise<MessageDto> {
        await this.alumnoRepository.update(id, updateAlumnoDto);

        return new MessageDto('Alumno actualizado correctamente.');
    }

    async delete(id: number): Promise<MessageDto> {
        await this.alumnoRepository.delete(id);

        return new MessageDto('Alumno eliminado correctamente.');
    }
}