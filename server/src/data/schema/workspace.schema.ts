import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { type Document, Types } from "mongoose"

export type UserDocument = Workspace & Document
@Schema({ timestamps: true })
export class Workspace {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @Prop([
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' }
    }
  ])
  members: { user: Types.ObjectId; role: string }[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
