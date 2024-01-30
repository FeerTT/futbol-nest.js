import { Module } from '@nestjs/common';

import { MapperService } from '../application/mapper/mapper.service';
import { UtilsService } from './utils/utils.service';

@Module({
  providers: [MapperService, UtilsService],
  exports: [MapperService, UtilsService],
})
export class CommonModule {}
