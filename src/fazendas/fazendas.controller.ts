import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FazendasService } from './fazendas.service';
import { CreateFazendaDto } from './dto/create-fazenda.request.dto';
import { UpdateFazendaDto } from './dto/update-fazenda.request.dto';

@ApiTags('Fazenda')
@Controller('fazendas')
export class FazendasController {
  constructor(private readonly fazendasService: FazendasService) {}

  @Post()
  create(@Body() createFazendaDto: CreateFazendaDto) {
    try {
      return this.fazendasService.create(createFazendaDto);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateFazendaDto: UpdateFazendaDto) {
    try {
      return this.fazendasService.update(parseInt(id), updateFazendaDto);
    } catch (error) {
      throw error;
    }
  }
}
