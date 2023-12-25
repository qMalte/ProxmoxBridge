import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("domains")
export class Domain extends BaseEntity {

    @PrimaryGeneratedColumn() public id: number;

    @Column() public name: string;
    @Column() public smtpHost: string;
    @Column() public verifyToken: string;
    @Column() public authToken: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date

    @Column({default: null}) lastCheck: Date
    @Column() public isValid: boolean = false;
    @Column() public checksFailed: number = 0;

}
