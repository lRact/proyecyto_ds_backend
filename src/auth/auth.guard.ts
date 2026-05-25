import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { Request } from 'express';
import {MessageDto} from "../common/message.dto";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token) {
            throw new UnauthorizedException(new MessageDto('Access denied'));
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload;

            return true;
        }
        catch(error) {
            throw new UnauthorizedException(new MessageDto(`Invalid token: ${error}`));
        }
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token: undefined;
    }
}