import { Item } from "src/master/item/entity/item.entity";
import { RopeSpecification } from "src/master/rope-specification/entity/rope-specification.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'color' })
export class Color {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    colorName: string

    @Column({ default: null })
    shortCode: string

    @Column({ default: null })
    matchingColor: string

    @Column({ type: 'simple-json', default: null })
    applicableFor: { [key: string]: any };

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

    @OneToMany(() => Item, item => item.color)
    item: Item

    @OneToMany(() => Item, item => item.treasureYarnColor)
    treasureYarnItems: Item[];

    @OneToMany(() => RopeSpecification, ropeSpecification => ropeSpecification.color)
    ropeSpecification: RopeSpecification
}