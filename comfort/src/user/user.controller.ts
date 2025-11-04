import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFormDto } from './dto/createForm.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('logueado')
    async getLogueado(@Req() req) {
        return { 
            user: req.user,
            msg: 'Usuario logueado exitosamente'
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req) {
        return { 
            user: req.user,
            msg: 'Ruta privada, solo con JWT válido' 
        };
    }

}