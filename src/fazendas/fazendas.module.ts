import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { FazendasController } from './fazendas.controller';
import { FazendasService } from './fazendas.service';
import { FazendaRepository } from './fazenda.repository';
import { Fazenda } from './entities/fazenda.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Fazenda])],
  controllers: [FazendasController],
  providers: [FazendasService, FazendaRepository],
  exports:[FazendasService]
})
export class FazendasModule {}
