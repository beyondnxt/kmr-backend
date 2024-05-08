import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sales_lead'})
export class SalesLead{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    shortCode: string

    @Column()
    userId: number

    @ManyToOne(() => User, user => user.saleslead)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}