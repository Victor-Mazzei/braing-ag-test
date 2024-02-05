import { Module } from '@nestjs/common';
import { CulturasService } from './culturas.service';
import { CulturasController } from './culturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultura } from './entities/cultura.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cultura])],
  providers: [CulturasService],
  controllers: [CulturasController],
  exports:[CulturasService]
})
export class CulturasModule {}
