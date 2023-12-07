

import {Column, Entity,PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm'


@Entity()


export class BaseEntity {


    @PrimaryGeneratedColumn('uuid')
    public id : string

    @UpdateDateColumn()
    public updatedAt : Date

    @CreateDateColumn()
    public createdAt : Date


}
