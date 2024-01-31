// src/fazendas/dto/create-fazenda.dto.ts
import { IsString, IsNotEmpty, Min, IsNumber } from 'class-validator';

export class CreateFazendaDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsNumber()
  @Min(0)
  areaTotalHectares: number;

  @IsNumber()
  @Min(0)
  areaAgricultavelHectares: number;

  @IsNumber()
  @Min(0)
  areaVegetacaoHectares: number;

  @IsNumber()
  produtorId: number;
}
