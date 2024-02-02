import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { Player } from '../domain/player.domain';
import { PlayerService } from '../application/service/player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Player> {
    return this.playerService.findById(id);
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.create(createPlayerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.playerService.delete(id);
  }
}
