import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService)=>({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        })
    }),
    AuthModule,
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [ MailService,AppService],
})
export class AppModule {}
