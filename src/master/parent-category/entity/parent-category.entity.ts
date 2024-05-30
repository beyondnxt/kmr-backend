import { Category } from "src/master/category/entity/category.entity";
import { ChildCategory } from "src/master/child-category/entity/child-category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'parent-category' })
export class ParentCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

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

    @OneToMany(() => ChildCategory, childCategory => childCategory.parentCategory)
    childCategory: ChildCategory

    @OneToMany(()=>Category, category=>category.parentCategory)
    category: Category
}