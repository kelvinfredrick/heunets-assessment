import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: (User | Types.ObjectId)[];

  @Prop({ default: 0 })
  progress: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
