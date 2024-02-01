// src/fazendas/dto/create-fazenda.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Min, IsNumber } from 'class-validator';

export class CreateFazendaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  areaTotalHectares: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  areaAgricultavelHectares: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  areaVegetacaoHectares: number;

  @ApiProperty()
  @IsNumber()
  produtorId: number;
}
