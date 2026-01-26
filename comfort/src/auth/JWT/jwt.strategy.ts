import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from 'src/schemas/login.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Login.name) private readonly userModel: Model<Login>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.userModel.findById(payload.sub).select('-password');
        if (!user) {
            throw new UnauthorizedException('Token inválido o usuario no encontrado');
        }

        return {userId: user._id, email: user.email, fullname: user.fullname}; 
    }
}
