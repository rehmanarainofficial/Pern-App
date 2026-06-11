import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  register(registerDto: RegisterDto) {
    const user = this.userRepository.create({
      ...registerDto,
      username: registerDto.name.replace(/\s+/g, '').toLowerCase().trim(),
    });
    return this.userRepository.save(user);
  }
}
