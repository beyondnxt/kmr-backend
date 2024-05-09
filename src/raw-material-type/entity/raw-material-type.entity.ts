import { Brand } from "src/brand/entity/brand.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "raw_material_type" })
export class RawMaterialType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToOne(() => Brand, brand => brand.rawMaterialType)
    brand: Brand
}