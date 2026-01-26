import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Login} from '../schemas/login.schema';
import { CreateRegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Login.name) private userModel: Model<Login>,
        private readonly jwtService: JwtService,
    ) { }

    async register(createRegisterDto: CreateRegisterDto) {
        const { fullname, email, password } = createRegisterDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('El correo ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return {
            message: 'Usuario registrado exitosamente',
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
            },
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: user._id, email: user.email, fullname: user.fullname };

        const token = await this.jwtService.signAsync(payload);

        return {
            message: 'Login exitoso',
            accessToken: token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        };
    }
}