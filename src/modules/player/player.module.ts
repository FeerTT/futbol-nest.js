import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './controllers/player.controller';
import { PlayerService } from './application/service/player.service';
import { PlayerEntity } from './infrastructure/entities/player.entity';
import { PlayerSqliteRepository } from './infrastructure/player.sqlite3.repository';
import { CommonModule } from '@/common/infrastructure/common.module';
import { TeamModule } from '../team/team.module';
@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity]), CommonModule, TeamModule],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    { provide: 'PLAYER_REPOSITORY', useClass: PlayerSqliteRepository },
  ],
  exports: [PlayerService],
})
export class PlayerModule {}
