import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';
import { ProdutorRepository } from './produtor.repository';
import { Produtor } from './entities/produtor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  controllers: [ProdutoresController],
  providers: [ProdutoresService, ProdutorRepository],
  exports: [ProdutoresService],
})
export class ProdutoresModule {}
