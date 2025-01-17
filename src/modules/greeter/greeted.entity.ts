import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Greeted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'normal' })
  formality: string;
}
