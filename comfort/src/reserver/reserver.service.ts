import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva } from '../schemas/reserver.schema';
import { CreateReservaDto } from '../reserver/dto/create-reserver';

@Injectable()
export class ReservasService {
    constructor(@InjectModel(Reserva.name) private reservaModel: Model<Reserva>) { }

    async crearReserva(createReservaDto: CreateReservaDto, userId: string) {
        const nuevaReserva = new this.reservaModel({
            ...createReservaDto,
            userId,
        });
        await nuevaReserva.save();
        return {
            message: 'Reserva creada correctamente',
            reserva: nuevaReserva,
        };
    }

    async obtenerReservasPorUsuario(userId: string) {
        return this.reservaModel.find({ userId }).sort({ createdAt: -1 });
    }
}
