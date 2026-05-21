import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import {RolEntity} from "./entities/rol.entity";

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService) { }

    @Get()
    async getAll(): Promise<RolEntity[]> {
        return this.rolService.getAll();
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.rolService.getById(+id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() createRolDto: CreateRolDto) {
        return await this.rolService.create(createRolDto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRolDto: CreateRolDto) {
        return await this.rolService.update(+id, updateRolDto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.rolService.delete(+id);
    }
}
