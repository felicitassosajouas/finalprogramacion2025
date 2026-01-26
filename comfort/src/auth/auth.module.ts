import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema} from 'src/schemas/login.schema';
import { UsersModule } from 'src/user/user.module';
import { jwtConstants} from './jwt/jwt.constant'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Login.name,
      schema: LoginSchema
    }]),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d'}
    }),
    PassportModule.register({ defaultStrategy: 'jwt'})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, PassportModule, AuthService]
})
export class AuthModule {}
