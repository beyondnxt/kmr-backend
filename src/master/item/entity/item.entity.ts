import { Category } from "src/master/category/entity/category.entity";
import { Color } from "src/master/color/entity/color.entiry";
import { Company } from "src/master/company/entity/company.entity";
import { RopeType } from "src/master/rope/entity/rope-type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'item' })
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    itemTypeId: number

    @ManyToOne(() => RopeType, ropeType => ropeType.item)
    @JoinColumn({ name: 'itemTypeId' })
    ropeType: RopeType

    @Column({ default: null })
    categoryId: number

    @ManyToOne(() => Category, category => category.item)
    @JoinColumn({ name: 'categoryId' })
    category: Category

    @Column({ default: null })
    itemCode: string

    @Column({ default: null })
    colorId: number

    @ManyToOne(() => Color, color => color.item)
    @JoinColumn({ name: 'colorId' })
    color: Color

    @Column({ default: null })
    strand: string

    @Column({ default: null })
    length: string

    @Column({ default: null })
    noOfTwist: number

    @Column({ default: null })
    twineType: string

    @Column({ default: null })
    treasureYarn: boolean

    @Column({ default: null })
    treasureYarnColorId: number

    @ManyToOne(() => Color, color => color.treasureYarnItems)
    @JoinColumn({ name: 'treasureYarnColorId' })
    treasureYarnColor: Color

    @Column({ default: null })
    itemName: string

    @Column({ default: null })
    itemUnit: string

    @Column({ default: null })
    minimumStock: boolean

    @Column({ default: null })
    reOrderQty: string

    @Column({ default: null })
    location: number

    @ManyToOne(() => Company, company => company.user)
    @JoinColumn({ name: 'location' })
    company: Company

    @Column({ default: null })
    currentStock: string

    @Column({ default: null })
    noOfLeadDays: string

    @Column({ default: null })
    kpcCode: string

    @Column({ default: null })
    description: string

    @Column({ default: null })
    smsItem: boolean

    @Column({ type: 'longtext', nullable: true })
    itemImage: string

    @Column({ default: false })
    isApproved: boolean

    @Column({ default: false })
    deleted: boolean

    @Column({ default: null })
    createdBy: number

    @CreateDateColumn()
    createdOn: Date

    @Column({ default: null })
    updatedBy: number

    @UpdateDateColumn()
    updatedOn: Date

}