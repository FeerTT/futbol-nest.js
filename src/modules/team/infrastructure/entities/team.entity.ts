import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column()
  tla: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  email: string;

  @Column()
  founded: number;

  @Column()
  clubColors: string;

  @Column({ nullable: true })
  venue: string;

  @UpdateDateColumn({ name: 'lastUpdate' })
  lastUpdate: Date;
}
