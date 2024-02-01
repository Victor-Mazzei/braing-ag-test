// src/fazendas/dto/create-fazenda.dto.ts
import {
  IsString,
  IsNotEmpty,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateFazendaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  estado: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  areaTotalHectares: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  areaAgricultavelHectares: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  areaVegetacaoHectares: number;

  @IsNumber()
  produtorId: number;
}
