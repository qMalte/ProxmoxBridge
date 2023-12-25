import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"

@Entity("settings")
export class SetupEntity extends BaseEntity {

    @PrimaryGeneratedColumn() public id: number;
    @Column() public identifier: string;
    @Column({default: null}) public stringValue: string;
    @Column({default: false}) public boolValue: boolean;
    @Column({default: 0}) public numericValue: number;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;
}
