import { RawMaterialType } from "src/raw-material-type/entity/raw-material-type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'brand' })
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rawMaterialTypeId: number

    @ManyToOne(() => RawMaterialType, rawMaterialType => rawMaterialType.brand)
    @JoinColumn({ name: 'rawMaterialTypeId' })
    rawMaterialType: RawMaterialType

    @Column()
    name: string

    @Column()
    brandPriorityOrder: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}