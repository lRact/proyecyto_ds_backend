import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActividadEntity} from "./entities/actividad.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ActividadEntity])],
    controllers: [ActividadController],
    providers: [ActividadService],
})
export class ActividadModule {}
