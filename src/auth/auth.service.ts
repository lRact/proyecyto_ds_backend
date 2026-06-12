import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./entities/usuario.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {CreateUsuarioDto} from "./dto/create-usuario.dto";
import * as bcrypt from 'bcrypt';
import {MessageDto} from "../common/message.dto";
import {LoginUsuarioDto} from "./dto/login-usuario.dto";
import {UpdateUsuarioDto} from "./dto/update-usuario.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: Repository<UsuarioEntity>,
        private jwtService: JwtService
    ) { }

    async getAll(): Promise<UsuarioEntity[]> {
        const list = await this.usuarioRepository.find();

        if(!list.length) {
            throw new NotFoundException('No se encontraron usuarios.');
        }

        return list;
    }

    async getById(id: number): Promise<UsuarioEntity> {
        const user = await this.usuarioRepository.findOneBy({id});

        if(!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        return user;
    }

    async getByEmail(email: string): Promise<UsuarioEntity> {
        const user = await this.usuarioRepository.findOneBy({correo: email});

        if(!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        return user;
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<MessageDto> {
        const numRound = 10;
        const emailExists = await this.usuarioRepository.findOneBy({correo: createUsuarioDto.correo});

        if (emailExists) {
            throw new ConflictException(new MessageDto('El correo ya existe.'));
        }

        createUsuarioDto.password = await bcrypt.hash(createUsuarioDto.password, numRound);

        const nuevoUsuario = this.usuarioRepository.create({
            nombre: createUsuarioDto.nombre,
            correo: createUsuarioDto.correo,
            password: createUsuarioDto.password,
            id_rol: createUsuarioDto.id_rol
        });

        await this.usuarioRepository.save(nuevoUsuario);

        return new MessageDto(`El usuario con correo ${createUsuarioDto.correo} fue creado correctamente.`);
    }

    async login(loginUsuarioDto: LoginUsuarioDto): Promise<{ accessToken: string }> {
        const { email, password } = loginUsuarioDto;
        const emailExists = await this.usuarioRepository.findOneBy({correo: email});

        if (!emailExists) {
            throw new UnauthorizedException(new MessageDto('Credenciales invalidas.'));
        }

        const passwordMatch = await bcrypt.compare(password, emailExists.password);

        if (!passwordMatch) {
            throw new UnauthorizedException(new MessageDto('Credenciales invalidas.'));
        }

        const token = await this.generateToken(emailExists.id);
        return { accessToken: token.accessToken };
    }

    async generateToken(userId) {
        const accessToken = this.jwtService.sign({ userId });
        return { accessToken };
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<MessageDto> {
        const numRound = 10;
        const usuario = await this.getById(id);

        if(!usuario) {
            throw new BadRequestException(new MessageDto(`Usuario con ID ${id} no encontrado.`))
        }

        if(updateUsuarioDto.correo) {
            const exists = await this.getByEmail(updateUsuarioDto.correo);

            if(exists && exists.id !== id) {
                throw new ConflictException(new MessageDto('El correo ya existe.'));
            }
        }

        if(updateUsuarioDto.password) {
            updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, numRound);
        }

        await this.usuarioRepository.update(id, updateUsuarioDto);

        const correo = updateUsuarioDto.correo || usuario.correo;

        return new MessageDto(`Usuario con correo ${correo} actualizado.`)
    }

    async delete(id: number): Promise<MessageDto> {
        const usuario = await this.getById(id);

        if(!usuario) {
            throw new BadRequestException(new MessageDto(`Usuario con ID ${id} no encontrado.`));
        }

        await this.usuarioRepository.remove(usuario);

        return new MessageDto(`Usuario con ID ${id} eliminado.`);
    }
}