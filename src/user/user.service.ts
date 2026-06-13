import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  async findAll() {
    let users = await this.userRepository.find();
    if (!users) {
      throw new BadRequestException('No users found');
    }
    return users;
  }

  async findOne(id: number) {
    let user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async profileMe(id: number) {
    let user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  async remove(id: number) {
    let deleteUser = await this.userRepository.delete({ id });
    return deleteUser.affected
      ? { message: 'User deleted successfully' }
      : { message: 'User not found' };
  }
}
