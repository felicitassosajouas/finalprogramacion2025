import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class FormPreferences extends Document {
    @Prop({
        required: true,
        type: Number,
    })
    numberOfPeople: number;

    @Prop({
        required: true,
        type: Boolean,
    })
    travelchildren: boolean;

    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    date: string;

    @Prop({
        required: true,
        type: Number,
    })
    stay: number;

    @Prop({
        required: true,
        type: Number,
    })
    budget: number;

    @Prop({
        type: [String],
        required: true,
        trim: true,
    })
    interests: string[];

    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    city: string;
}

export const FormSchema = SchemaFactory.createForClass(FormPreferences);
