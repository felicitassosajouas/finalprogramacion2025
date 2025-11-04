import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { ConfigModule} from '@nestjs/config';
import { AppNestModule } from './mcp/mcp.module';
import { ReservasController } from './reserver/reserver.controller';
import { ReservasModule } from './reserver/reserver.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI||''),
    AuthModule,
    UsersModule,
    AppNestModule,
    ReservasModule
  ],
  controllers: [AppController, ReservasController],
  providers: [AppService],
})
export class AppModule {}
