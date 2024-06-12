import { Category } from "src/master/category/entity/category.entity";
import { Item } from "src/master/item/entity/item.entity";
import { RopeGrade } from "src/master/rope-grade/entity/rope-grade.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope-type' })
export class RopeType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ropeType: string

    @Column({ default: null })
    shortCode: string

    @Column({ default: null })
    pieceNoShortCode: string

    @Column({ default: false})
    deleted: boolean

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(()=>RopeGrade, ropeGrade=>ropeGrade.ropeType)
    ropeGrade: RopeGrade

    @OneToMany(() => Item, item => item.ropeType)
    item: Item

    @OneToMany(() => Category, category => category.ropeType)
    category: Category
}