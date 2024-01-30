// src/produtores/dto/create-produtor.dto.ts
import { IsString, Length, IsNotEmpty, Matches } from 'class-validator';

export class CreateProdutorDTO {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  identificacaoFiscal: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(CPF|CNPJ)$/)
  tipoIdentificacao: string;

  @IsString()
  @IsNotEmpty() 
  nome: string;
}
