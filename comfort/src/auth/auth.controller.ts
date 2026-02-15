import { Controller, Post, Body, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth') // Este es el prefijo que usamos en el frontend: /auth/register
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createRegisterDto: CreateRegisterDto) {
        // Este método recibe fullname, dni, email, phone y password desde el frontend
        return this.authService.register(createRegisterDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(@Request() req) {
        return {
            id: req.user.id,
            fullname: req.user.fullname,
            email: req.user.email,
        };
    }
}