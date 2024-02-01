// src/fazendas/dto/create-fazenda.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateFazendaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cidade: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  estado: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  areaTotalHectares: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  areaAgricultavelHectares: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  areaVegetacaoHectares: number;

  @ApiProperty()
  @IsNumber()
  produtorId: number;
}
