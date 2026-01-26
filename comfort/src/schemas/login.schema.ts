import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Login {
    @Prop({
        required: true,
        trim: true,
    })
    fullname: string;

    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    email: string;

    @Prop({
        required: true,
        minlength: 8,
    })
    password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);