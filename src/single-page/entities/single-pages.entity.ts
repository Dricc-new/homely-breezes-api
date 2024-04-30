import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { VISIBILITY } from "src/constants/roles";

@Schema({ timestamps: true })
export class SinglePages {
    _id: Types.ObjectId;

    @Prop({ unique: true })
    title: string;

    @Prop({ type: Object })
    data: Record<string, unknown>;

    @Prop({ default: VISIBILITY.DRAFT })
    visibility: VISIBILITY;
}

export type SinglePagesDocument = HydratedDocument<SinglePages>;
export const SinglePagesSchema = SchemaFactory.createForClass(SinglePages)