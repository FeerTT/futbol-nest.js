import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PlayerEntity } from '@/modules/player/infrastructure/entities/player.entity';

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

  @Column()
  crestUrl: string;

  @UpdateDateColumn({ name: 'lastUpdate' })
  lastUpdate: Date;

  @OneToMany(() => PlayerEntity, (player) => player.teamId)
  squad: PlayerEntity[];
}
