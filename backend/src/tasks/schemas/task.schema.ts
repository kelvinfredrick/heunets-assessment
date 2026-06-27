import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../../projects/schemas/project.schema';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: 'To Do', enum: ['To Do', 'In Progress', 'Completed'] })
  status: string;

  @Prop({ default: 'Medium', enum: ['Low', 'Medium', 'High'] })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true, index: true })
  project: Project | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignee?: User | Types.ObjectId;

  @Prop()
  dueDate?: string;

  @Prop({ default: 0 })
  progress: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
