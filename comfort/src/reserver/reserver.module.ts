import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservasService } from '../reserver/reserver.service';
import { ReservasController } from '../reserver/reserver.controller';
import { Reserva, ReservaSchema } from '../schemas/reserver.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }])],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService]
})
export class ReservasModule {}
