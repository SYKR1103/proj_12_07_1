import { BaseEntity } from "src/common/base.entity";
import {Column, BeforeInsert, Entity} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Role } from "./role.enum";

@Entity()

export class User extends BaseEntity{

    @Column()
    public nickname : string

    @Column({default:true})
    public email : string

    @Column()
    public password : string

    @Column({
        type : 'enum',
        enum : Role,
        default : [Role.USER],
        array: true


    }) public roles: Role[]



    @BeforeInsert()
    async hashPassword() : Promise<void> {
        try{
        const saltValue = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, saltValue)
        } catch(e) {
            console.log(e)
            throw new InternalServerErrorException()
        }        
    }

    async checkPassword(aPassword: string) : Promise<boolean> {
        try{
            const isMatched = await bcrypt.compare(aPassword, this.password)
            return isMatched
        } catch(e) {
            console.log(e)
            throw new InternalServerErrorException()
        }
        }



}
