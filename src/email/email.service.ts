import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import {ConfigService} from '@nestjs/config'
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {


    private nodemailTransporter : Mail 

    constructor (
        private readonly ConfigService : ConfigService
    ) {

        this.nodemailTransporter = createTransport({

            service : ConfigService.get('EMAIL_SERVICE'),
            auth : {
                user: ConfigService.get('EMAIL_USER'),
                pass: ConfigService.get('EMAIL_PASSWORD'),
            }


        })



    }

    sendMail(options : Mail.Options) {
        return this.nodemailTransporter.sendMail(options)
    }



}
