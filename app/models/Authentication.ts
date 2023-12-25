import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne
} from "typeorm"
import {authenticator} from "otplib";
import {Group} from "./Group";

@Entity("authentications")
export class Authentication extends BaseEntity {

    @PrimaryGeneratedColumn() public id: number;
    @Column() public email: string;
    @Column() public identifier: string;
    @Column() public secret: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date

}
