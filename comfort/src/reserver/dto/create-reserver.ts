import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateReservaDto {
    @IsNotEmpty()
    fullname: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @Min(1)
    cantidadPersonas: number;
}
