import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateRegisterDto { //puedo realizar un interface tambien
    @IsString()
    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    fullname: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
}