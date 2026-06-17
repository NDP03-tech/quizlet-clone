import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  surName: string;
  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  email: string;
}
