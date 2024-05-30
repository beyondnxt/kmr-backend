import { IsEmail } from "class-validator"
import { User } from "src/admin/user/entity/user.entity";
import { Department } from "src/master/department/entity/department.entity";
import { Extruder } from "src/master/extruder/entity/extruder.entity";
import { Item } from "src/master/item/entity/item.entity";
import { RopeMachine } from "src/master/rope-machine/entity/rope-machine.entity";
import { Warehouse } from "src/master/warehouse/entity/warehouse.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'company' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    companyName: string

    @Column({ default: null })
    location: string

    @Column({ default: null })
    code: string

    @Column({ default: null })
    vatTin: string

    @Column({ default: null })
    cstNo: string

    @Column({ default: null })
    pan: string

    @Column({ default: null })
    accountYear: string

    @Column({ default: null })
    referenceNumber: string

    @Column({ default: null })
    gstIn: string

    @Column({ default: null })
    address: string

    @Column({ default: null })
    @IsEmail()
    email: string;

    @Column({ default: null })
    mobileNumber: string;

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

    @OneToMany(() => Warehouse, warehouse => warehouse.company)
    warehouse: Warehouse[];

    @OneToMany(() => User, user => user.company)
    user: User[];

    @OneToMany(() => Extruder, extruder => extruder.company)
    extruder: Extruder[];

    @OneToMany(() => Department, department => department.company)
    department: Department[];

    @OneToMany(() => RopeMachine, ropeMachine => ropeMachine.company)
    ropeMachine: RopeMachine[];

    @OneToMany(() => Item, item => item.company)
    item: Item[];
}