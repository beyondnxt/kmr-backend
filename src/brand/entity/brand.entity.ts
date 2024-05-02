import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'brand'})
export class Brand{
    @PrimaryGeneratedColumn()
    id: number
}