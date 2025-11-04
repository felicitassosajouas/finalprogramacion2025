import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, Matches } from 'class-validator';

export class CreateFormDto { 
    @IsNumber()
    @IsNotEmpty({ message: 'El valor debe ser mayor de 0 o igual a 1' })
    numberOfPeople: number;

    @IsBoolean()
    travelchildren: boolean;

    @IsString()
    @IsNotEmpty({ message: 'La fecha de viaje es obligatoria' })
    @Matches(
        /^(?:\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/,
        { message: 'La fecha debe estar en formato YYYY-MM-DD o DD/MM/YYYY' }
    )
    date: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Este campo es obligatorio' })
    stay: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El presupuesto es obligatorio'})
    budget: number;

    @IsArray()
    @IsString({ each: true })
    interests: string[];

    @IsString()
    @IsNotEmpty({ message: 'Este campo es obligatorio' })
    city: string;
}
