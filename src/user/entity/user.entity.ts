import { Department } from 'src/department/entity/department.entity';
import { Role } from 'src/role/entity/role.entity';
import { SalesLead } from 'src/sales-lead/entity/sales-lead.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({ default: null })
    fullName: string;

    @Column()
    location: string;

    @Column({ default: null })
    departmentId: number

    @ManyToOne(() => Department, department => department.user)
    @JoinColumn({ name: 'departmentId' })
    department: Department;

    @Column({ default: null })
    password: string;

    @Column({ default: null })
    mobileNumber: string;

    @Column({ default: null })
    email: string

    @Column({ name: 'roleId' })
    roleId: number

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn({ name: 'roleId' })
    role: Role

    @Column()
    status: boolean

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(() => SalesLead, saleslead => saleslead.user)
    saleslead: SalesLead[];

}