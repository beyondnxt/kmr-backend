import { Category } from "src/category/entity/category.entity";
import { RopeType } from "src/rope/entity/rope-type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'rope-grade'})
export class RopeGrade{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ropeTypeId: number

    @ManyToOne(()=>RopeType, ropeType=>ropeType.ropeGrade)
    @JoinColumn({name: 'ropeTypeId'})
    ropeType: RopeType

    @Column()
    categoryId: number

    @ManyToOne(()=>Category, category=>category.ropeGrade)
    @JoinColumn({name: 'categoryId'})
    category: Category

    @Column({ default: null })
    grade: string

    @Column({ default: null })
    rmComb: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;

}