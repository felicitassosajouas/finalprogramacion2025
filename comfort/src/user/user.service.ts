import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFormDto } from './dto/createForm.dto';
import { FormPreferences } from 'src/schemas/formPreference';
import { McpService } from '../mcp/mcp.service';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(FormPreferences.name)
        private readonly travelModel: Model<FormPreferences>,
    ) { }

    async savePreferences(userId: string, dto: CreateFormDto) {
        
        await this.travelModel.create({ ...dto, user: userId });
    }

}