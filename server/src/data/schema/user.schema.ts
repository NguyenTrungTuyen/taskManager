import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type UserDocument = User & Document
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false})
  password: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop()
  picture?: string;

  @Prop({required: false, unique: true, sparse: true})
  googleId?: string;

  @Prop({default: 'local'})
  origin?: string;

  @Prop({default: true})
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
