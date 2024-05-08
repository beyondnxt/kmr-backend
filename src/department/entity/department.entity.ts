import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'department' })
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    departmentName: string

    @Column()
    location: string

    @Column({ type: 'simple-json', default: null })
    type: { [key: string]: any };


    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(() => User, user => user.department)
    user: User[];
}