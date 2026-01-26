import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller'
import { User, UserSchema } from '../schemas/user.schema';
import { FormSchema, FormPreferences } from 'src/schemas/formPreference';
import { McpService } from '../mcp/mcp.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    {name: FormPreferences.name, schema: FormSchema}
  ])],
  providers: [UsersService, McpService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }