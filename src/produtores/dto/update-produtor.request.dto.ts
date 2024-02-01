// src/produtores/dto/update-produtor.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateProdutorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @IsOptional()
  identificacaoFiscal?: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(CPF|CNPJ)$/)
  @IsOptional()
  tipoIdentificacao?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;
}
