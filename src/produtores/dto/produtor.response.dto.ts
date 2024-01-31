// src/produtores/dto/create-produtor.dto.ts
import { IsNumber, IsString } from 'class-validator';

export class ProdutorResponseDto {
  @IsNumber()
  status: number;

  @IsString()
  message: string;
}
