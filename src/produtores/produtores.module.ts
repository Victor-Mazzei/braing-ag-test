import { Module } from '@nestjs/common';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';

@Module({
  controllers: [ProdutoresController],
  providers: [ProdutoresService],
})
export class ProdutoresModule {}
