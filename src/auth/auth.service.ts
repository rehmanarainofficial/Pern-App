import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import crypto from 'node:crypto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerDto: RegisterDto) {
    let username = `@${registerDto.username}${crypto.randomInt(1000, 9999)}`;
    let otp = crypto.randomInt(100000, 999999).toString();
    let otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

    let hash = await bcrypt.hash(registerDto.password, 12);

    return this.userService.create({
      ...registerDto,
      otp,
      otpExpiration,
      username,
      isVerified: false,
      password: hash,
    });
  }
}
