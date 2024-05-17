import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'simple-json', default: null }) // Assuming menuAccess is stored as JSON
  menuAccess: { [key: string]: any };

  @OneToMany(() => User, user => user.role)
  user: User[];

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
}
