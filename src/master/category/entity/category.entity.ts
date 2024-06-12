import { ChildCategory } from "src/master/child-category/entity/child-category.entity";
import { Item } from "src/master/item/entity/item.entity";
import { ParentCategory } from "src/master/parent-category/entity/parent-category.entity";
import { RopeGrade } from "src/master/rope-grade/entity/rope-grade.entity";
import { RopeType } from "src/master/rope/entity/rope-type.entity";
import { SubCategory } from "src/master/sub-category/entity/sub-category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    parentCategoryId: number

    @ManyToOne(() => ParentCategory, parentCategory => parentCategory.category)
    @JoinColumn({ name: 'parentCategoryId' })
    parentCategory: ParentCategory

    @Column({ default: null })
    childCategoryId: number

    @ManyToOne(() => ChildCategory, childCategory => childCategory.category)
    @JoinColumn({ name: 'childCategoryId' })
    childCategory: ChildCategory

    @Column({ default: null })
    subCategoryId: number

    @ManyToOne(() => SubCategory, subCategory => subCategory.category)
    @JoinColumn({ name: 'subCategoryId' })
    subCategory: SubCategory

    @Column({ default: null })
    type: number

    @ManyToOne(() => RopeType, ropeType => ropeType.category)
    @JoinColumn({ name: 'type' })
    ropeType: RopeType

    @Column({ default: null })
    grade: number

    @ManyToOne(() => RopeGrade, ropeGrade => ropeGrade.category)
    @JoinColumn({ name: 'grade' })
    ropeGrade: RopeGrade

    @Column({ default: null })
    smsCategory: boolean

    @Column({ default: false })
    deleted: boolean

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date

    @OneToMany(() => Item, item => item.category)
    item: Item
}