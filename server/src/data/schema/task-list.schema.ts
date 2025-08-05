import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { type Document, Types } from "mongoose"

export type UserDocument = TaskList & Document
@Schema({ timestamps: true })
export class TaskList {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  board: Types.ObjectId;

  @Prop()
  order: number;
}

export const TaskListSchema = SchemaFactory.createForClass(TaskList);

