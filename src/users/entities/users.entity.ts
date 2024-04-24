import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ROLES } from "src/constants";

@Schema({ timestamps: true })
export class Users {
    _id: Types.ObjectId;

    @Prop()
    username: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: ROLES.BASIC })
    role: ROLES;

    @Prop({ default: true })
    enabled: boolean;
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users)