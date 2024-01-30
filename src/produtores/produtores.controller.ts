import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ProdutoresService } from './produtores.service';
import { CreateProdutorDTO } from './dto/create-produtor.dto';
import { UpdateProdutorDTO } from './dto/update-produtor.dto';

@Controller('produtores')
export class ProdutoresController {
    constructor(private readonly produtoresService: ProdutoresService) {}

    @Post('/create')
    create(@Body() createProdutorDTO: CreateProdutorDTO) {
        return this.produtoresService.create(createProdutorDTO);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateProdutorDTO: UpdateProdutorDTO) {
        return this.produtoresService.update(parseInt(id), updateProdutorDTO);
    }
}