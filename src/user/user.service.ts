import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmailOrUsername(emailOrUsername: string) {
    return await this.userRepository.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }

  async create(registerDto: Partial<User>) {
    if (!registerDto.email || !registerDto.username) {
      throw new BadRequestException('Email and username are required');
    }
    let isUserExist =
      (await this.findByEmailOrUsername(registerDto.email)) ||
      (await this.findByEmailOrUsername(registerDto.username));
    if (isUserExist) {
      throw new BadRequestException(
        'User with this email or username already exists',
      );
    }
    const user = this.userRepository.create(registerDto);
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
