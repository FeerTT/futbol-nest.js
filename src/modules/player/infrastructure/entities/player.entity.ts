import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TeamEntity } from '@/modules/team/infrastructure/entities/team.entity';
@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  countryOfBirth: string;

  @Column()
  nationality: string;

  @Column()
  position: string;

  @UpdateDateColumn({ name: 'lastUpdate' })
  lastUpdated: Date;

  @ManyToOne(() => TeamEntity, (team) => team.squad)
  teamId: TeamEntity;
}
