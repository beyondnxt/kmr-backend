import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rope' })
export class Rope {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ropeType: string

    @Column({ default: null })
    shortCode: string

    @Column({ default: null })
    pieceNoShortCode: string

    @Column({ default: null })
    createdBy: number;

    @CreateDateColumn()
    createdOn: Date;

    @Column({ default: null })
    updatedBy: number;

    @UpdateDateColumn()
    updatedOn: Date;
}