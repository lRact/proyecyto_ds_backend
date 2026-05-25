import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AlumnoEntity} from "./entities/alumno.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoEntity])],
  controllers: [AlumnoController],
  providers: [AlumnoService],
})
export class AlumnoModule {}
