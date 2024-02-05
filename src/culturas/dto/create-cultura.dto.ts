// src/fazendas/dto/create-fazenda.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';

export class CreateCulturaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;
}
