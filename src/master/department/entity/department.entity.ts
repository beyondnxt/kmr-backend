import { User } from "src/admin/user/entity/user.entity";
import { Company } from "src/master/company/entity/company.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'department' })
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    departmentName: string

    @Column({ default: null })
    location: number

    @ManyToOne(() => Company, company => company.department)
    @JoinColumn({ name: 'location' })
    company: Company;

    @Column({ type: 'simple-json', default: null })
    type: { [key: string]: any };

    @Column({ default: false })
    deleted: boolean

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