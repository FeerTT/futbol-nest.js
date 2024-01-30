import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Player } from '../domain/player.domain';
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: any) {}

  @Post()
  async create(@Body() player: any): Promise<Player> {
    return this.playerService.create(player);
  }
}
