import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.usersService.create(registerDto);
    const token = this.generateToken(user);
    
    // Remove password from user object in response
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
