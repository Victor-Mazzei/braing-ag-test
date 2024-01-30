import { Module } from '@nestjs/common';
import { CulturasService } from './culturas.service';
import { CulturasController } from './culturas.controller';

@Module({
  providers: [CulturasService],
  controllers: [CulturasController],
})
export class CulturasModule {}
