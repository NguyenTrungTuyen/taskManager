import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { type Document, Types } from "mongoose"

export type UserDocument = Board & Document
@Schema({ timestamps: true })
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' })
  workspace: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

