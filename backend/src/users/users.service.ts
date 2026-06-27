import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.email || !userData.password) {
      throw new BadRequestException('Email and password are required');
    }

    const emailLower = userData.email.toLowerCase();
    const existing = await this.userModel.findOne({ email: emailLower }).exec();
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new this.userModel({
      ...userData,
      email: emailLower,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }
}
