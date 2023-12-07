import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DblistModule } from './dblist/dblist.module';
import { AppConfigModule } from './config/Appconfig.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import * as Joi from '@hapi/joi'

@Module({
  imports: [DblistModule, AppConfigModule, UserModule, AuthModule, RedisModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
