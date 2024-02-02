import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './modules/team/team.module';
import { CommonModule } from './common/infrastructure/common.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlayerModule } from './modules/player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/database.sqlite3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    TeamModule,
    PlayerModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
