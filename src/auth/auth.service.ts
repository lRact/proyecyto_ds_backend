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
            throw new NotFoundException('No users found');
        }

        return list;
    }

    async getById(id: number): Promise<UsuarioEntity> {
        const user = await this.usuarioRepository.findOneBy({id});

        if(!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getByEmail(email: string): Promise<UsuarioEntity> {
        const user = await this.usuarioRepository.findOneBy({correo: email});

        if(!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<MessageDto> {
        const numRound = 10;
        const emailExists = await this.usuarioRepository.findOneBy({correo: createUsuarioDto.correo});

        if (emailExists) {
            throw new ConflictException(new MessageDto('Email already exists'));
        }

        createUsuarioDto.password = await bcrypt.hash(createUsuarioDto.password, numRound);

        const nuevoUsuario = this.usuarioRepository.create({
            nombre: createUsuarioDto.nombre,
            correo: createUsuarioDto.correo,
            password: createUsuarioDto.password,
            id_rol: createUsuarioDto.id_rol
        });

        await this.usuarioRepository.save(nuevoUsuario);

        return new MessageDto(`User with email ${createUsuarioDto.correo} created successfully`);
    }

    async login(loginUsuarioDto: LoginUsuarioDto): Promise<MessageDto> {
        const { email, password } = loginUsuarioDto;
        const emailExists = await this.usuarioRepository.findOneBy({correo: email});

        if (!emailExists) {
            throw new UnauthorizedException(new MessageDto('Invalid credentials'));
        }

        const passwordMatch = await bcrypt.compare(password, emailExists.password);

        if (!passwordMatch) {
            throw new UnauthorizedException(new MessageDto('Invalid credentials'));
        }

        const token = await this.generateToken(emailExists.id);
        return new MessageDto(`User with email ${email} logged in successfully. Token: ${token.accessToken}`);
    }

    async generateToken(userId) {
        const accessToken = this.jwtService.sign({ userId });
        return { accessToken };
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<MessageDto> {
        const numRound = 10;
        const usuario = await this.getById(id);

        if(!usuario) {
            throw new BadRequestException(new MessageDto(`User with ID ${id} not found`))
        }

        if(updateUsuarioDto.correo) {
            const exists = await this.getByEmail(updateUsuarioDto.correo);

            if(exists && exists.id !== id) {
                throw new ConflictException(new MessageDto('Email already exists'));
            }
        }

        if(updateUsuarioDto.password) {
            updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, numRound);
        }

        await this.usuarioRepository.update(id, updateUsuarioDto);

        const correo = updateUsuarioDto.correo || usuario.correo;

        return new MessageDto(`User ${correo} updated`)
    }

    async delete(id: number): Promise<MessageDto> {
        const usuario = await this.getById(id);

        if(!usuario) {
            throw new BadRequestException(new MessageDto(`User with ID ${id} not found`));
        }

        await this.usuarioRepository.remove(usuario);

        return new MessageDto(`User with ID ${id} deleted`);
    }
}