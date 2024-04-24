import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'mainCustomer'})
export class MainCustomer{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    type: string

    @Column()
    country: string

    @Column({ default: null })
    createdBy: number;
  
    @CreateDateColumn()
    createdOn: Date;
  
    @Column({ default: null })
    updatedBy: number;
  
    @UpdateDateColumn()
    updatedOn: Date;
}