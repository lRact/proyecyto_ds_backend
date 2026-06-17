import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import {CreateActividadDto} from "./dto/create-actividad.dto";
import {UpdateActividadDto} from "./dto/update-actividad.dto";

@Controller('actividad')
export class ActividadController {
    constructor(private readonly actividadService: ActividadService) { }

    @Get()
    getAll() {
        return this.actividadService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.actividadService.getById(id);
    }

    @Get('usuario/:id')
    getByUser(@Param('id') id: number) {
        return this.actividadService.getByUser(id);
    }

    @Post()
    create(@Body() createActividadDto: CreateActividadDto) {
        return this.actividadService.create(createActividadDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateActividadDto: UpdateActividadDto) {
        return this.actividadService.update(id, updateActividadDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.actividadService.delete(id);
    }
}
