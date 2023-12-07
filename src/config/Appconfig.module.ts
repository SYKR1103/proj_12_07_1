
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import * as Joi from '@hapi/joi'

@Module({
  imports: [
        ConfigModule.forRoot({
            validationSchema : Joi.object({

              POSTGRES_HOST : Joi.string().required(),
              POSTGRES_PORT : Joi.string().required(),
              POSTGRES_USER : Joi.string().required(),
              POSTGRES_PASSWORD : Joi.string().required(),
              POSTGRES_DB : Joi.string().required(),
            }),
          }),
        ],
      })
      export class AppConfigModule {}