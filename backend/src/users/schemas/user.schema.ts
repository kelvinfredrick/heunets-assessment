import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password?: string; // Optional in responses to prevent leaking hashed password

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'Member' })
  role: string;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
