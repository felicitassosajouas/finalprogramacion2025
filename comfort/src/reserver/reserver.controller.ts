import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReservasService } from '../reserver/reserver.service';
import { CreateReservaDto } from '../reserver/dto/create-reserver';

@Controller('reservas')
export class ReservasController {
    constructor(private readonly reservasService: ReservasService) { }


    @UseGuards(AuthGuard('jwt'))
    @Post('nuevas')
    async crearReserva(@Body() dto: CreateReservaDto, @Request() req) {
        const userId = req.user.userId;
        return this.reservasService.crearReserva(dto, userId);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('mias')
    async obtenerReservas(@Request() req) {
        const userId = req.user.sub;
        return this.reservasService.obtenerReservasPorUsuario(userId);
    }
}
