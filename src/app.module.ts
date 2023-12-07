import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DblistModule } from './dblist/dblist.module';
import { AppConfigModule } from './config/Appconfig.module';
import { ConfigModule } from "@nestjs/config";
import * as Joi from '@hapi/joi'

@Module({
  imports: [AppConfigModule, DblistModule, AppConfigModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
