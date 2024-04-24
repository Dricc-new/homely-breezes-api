import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { MEDIA_TYPES } from "src/constants";

@Schema()
export class Medias {
    _id: Types.ObjectId;

    @Prop()
    url: string

    @Prop()
    key: string

    @Prop({ default: MEDIA_TYPES.IMAGE })
    type: MEDIA_TYPES
}

export type MediasDocument = HydratedDocument<Medias>;
export const MediasSchema = SchemaFactory.createForClass(Medias)