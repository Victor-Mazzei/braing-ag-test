import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoresService } from './produtores.service';
import { CreateProdutorDto } from './dto/create-produtor.request.dto';
import { UpdateProdutorDto } from './dto/update-produtor.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produtor')
@Controller('produtor')
export class ProdutoresController {
  constructor(private readonly produtoresService: ProdutoresService) {}

  @Post()
  create(@Body() createProdutorDto: CreateProdutorDto) {
    try {
      return this.produtoresService.create(createProdutorDto);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateProdutorDto: UpdateProdutorDto,
  ) {
    try {
      return this.produtoresService.update(parseInt(id), updateProdutorDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    try {
      return this.produtoresService.delete(parseInt(id));
    } catch (error) {
      throw error;
    }
  }
}
