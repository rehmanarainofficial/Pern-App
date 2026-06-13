import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MailService } from '../mail/mail.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile/:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get('me')
  @UseGuards(AuthGuard)
  profileMe(@Request() req) {
    return this.userService.profileMe(Number(req.user.id));
  }

  @Delete('profile/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
