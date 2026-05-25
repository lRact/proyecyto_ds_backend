import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import {CreateAlumnoDto} from "./dto/create-alumno.dto";
import {UpdateAlumnoDto} from "./dto/update-alumno.dto";

@Controller('alumno')
export class AlumnoController {
    constructor(private readonly alumnoService: AlumnoService) {}

    @Get()
    getAll() {
        return this.alumnoService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.alumnoService.getById(id);
    }

    @Post()
    create(@Body() createAlumnoDto: CreateAlumnoDto) {
        return this.alumnoService.create(createAlumnoDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateAlumnoDto: UpdateAlumnoDto) {
        return this.alumnoService.update(id, updateAlumnoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.alumnoService.delete(id);
    }
}
