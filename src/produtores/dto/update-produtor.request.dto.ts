// src/produtores/dto/update-produtor.dto.ts
import {
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateProdutorDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @IsOptional()
  identificacaoFiscal?: string;

  @IsString()
  @Matches(/^(CPF|CNPJ)$/)
  @IsOptional()
  tipoIdentificacao?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;
}
