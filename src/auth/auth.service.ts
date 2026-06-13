import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import crypto from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
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

  async login(loginDto: LoginDto) {
    let user = await this.userService.findByEmailOrUsername(
      loginDto.emailOrUsername,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    let token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
    return { user, token };
  }
}
