import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reserva extends Document {
    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, min: 1 })
    cantidadPersonas: number;

    @Prop({ type: String, required: true })
    userId: string;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);
