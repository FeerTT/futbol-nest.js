import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './application/service/team.service';
import { TeamEntity } from './infrastructure/entities/team.entity';
import { CommonModule } from '@/common/infrastructure/common.module';
import { TeamSqliteRepository } from './infrastructure/team.sqlite3.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity]),
    CommonModule,
    MulterModule.register({
      dest: './public/uploads',
    }),
  ],
  controllers: [TeamController],
  providers: [
    TeamService,
    {
      provide: 'TEAM_REPOSITORY',
      useClass: TeamSqliteRepository,
    },
  ],
  exports: [TeamService],
})
export class TeamModule {}
