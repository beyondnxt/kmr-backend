import { Category } from "src/master/category/entity/category.entity";
import { RopeSpecification } from "src/master/rope-specification/entity/rope-specification.entity";
import { RopeType } from "src/master/rope/entity/rope-type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope-grade' })
export class RopeGrade {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ropeTypeId: number

    @ManyToOne(() => RopeType, ropeType => ropeType.ropeGrade)
    @JoinColumn({ name: 'ropeTypeId' })
    ropeType: RopeType

    @Column({ default: null })
    categoryId: number

    @ManyToOne(() => Category, category => category.ropeGrade)
    @JoinColumn({ name: 'categoryId' })
    category: Category

    @Column({ default: null })
    grade: string

    @Column({ default: null })
    rmComb: string

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

    @OneToMany(() => RopeSpecification, ropeSpecification => ropeSpecification.ropeGrade)
    ropeSpecification: RopeSpecification

}