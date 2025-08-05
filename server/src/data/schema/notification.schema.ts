import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { type Document, Types } from "mongoose"

export type UserDocument = Notification & Document
@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  type: 'task_assigned' | 'comment_mention' | 'task_updated';

  @Prop()
  content: string;

  @Prop({ default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);


