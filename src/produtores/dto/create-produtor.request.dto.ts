// src/produtores/dto/create-produtor.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, Matches } from 'class-validator';

export class CreateProdutorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  identificacaoFiscal: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(CPF|CNPJ)$/)
  tipoIdentificacao: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;
}
