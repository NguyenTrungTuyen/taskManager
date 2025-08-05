import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { type Document, Types } from "mongoose"

export type UserDocument = Task & Document
@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TaskList' })
  list: Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  assignees: Types.ObjectId[];

  @Prop([String])
  tags: string[];

  @Prop()
  dueDate?: Date;

  @Prop([
    {
      text: String,
      done: Boolean
    }
  ])
  checklist?: { text: string; done: boolean }[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

