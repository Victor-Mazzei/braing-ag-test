import { Injectable } from '@nestjs/common';
import { CreateFazendaDto } from './dto/create-fazenda.request.dto';
import { Fazenda } from './entities/fazenda.entity';
import { FazendaRepository } from './fazenda.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FazendaBadRequestException,
  FazendaNotFoundException,
  FazendaValidationException,
} from 'src/exceptions/fazenda.exception';
import Estados from 'src/enums/estados';
import { UpdateFazendaDto } from './dto/update-fazenda.request.dto';

@Injectable()
export class FazendasService {
  constructor(
    @InjectRepository(Fazenda)
    private fazendaRepository: FazendaRepository,
  ) {}

  async create(fazendaData: CreateFazendaDto): Promise<Fazenda> {
    if (!this.checkAreaAgricutavelVegetacaoFazenda(fazendaData)) {
      throw new FazendaValidationException();
    }

    if (!this.checkEstadoFazenda(fazendaData)) {
      throw new FazendaBadRequestException('Estado não permitido');
    }

    const fazenda = this.fazendaRepository.create(fazendaData);
    return this.fazendaRepository.save(fazenda);
  }

  async update(
    id: number,
    updateFazendaDto: UpdateFazendaDto,
  ): Promise<Fazenda> {
    const fazenda = await this.fazendaRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!fazenda) {
      throw new FazendaNotFoundException();
    }

    if (updateFazendaDto.estado) {
      if (!this.checkEstadoFazenda(updateFazendaDto)) {
        throw new FazendaBadRequestException('Estado não permitido');
      }
    }

    if (
      !this.checkUpdateAreaAgricutavelVegetacaoFazenda(
        updateFazendaDto,
        fazenda,
      )
    ) {
      throw new FazendaValidationException();
    }

    Object.assign(fazenda, updateFazendaDto);

    return this.fazendaRepository.save(fazenda);
  }

  checkAreaAgricutavelVegetacaoFazenda(
    fazendaData: CreateFazendaDto | UpdateFazendaDto,
  ): boolean {
    if (
      fazendaData.areaAgricultavelHectares + fazendaData.areaVegetacaoHectares >
      fazendaData.areaTotalHectares
    ) {
      return false;
    }
    return true;
  }

  checkEstadoFazenda(fazendaData: CreateFazendaDto): boolean {
    return fazendaData.estado in Estados ? true : false;
  }

  checkUpdateAreaAgricutavelVegetacaoFazenda(
    fazendaData: UpdateFazendaDto,
    fazendaUpdate: Fazenda,
  ): boolean {
    if (!fazendaData.areaTotalHectares) {
      fazendaData.areaTotalHectares = fazendaUpdate.areaTotalHectares;
    }

    if (
      fazendaData.areaAgricultavelHectares &&
      !fazendaData.areaVegetacaoHectares
    ) {
      fazendaData.areaVegetacaoHectares = fazendaUpdate.areaVegetacaoHectares;
    }

    if (
      !fazendaData.areaAgricultavelHectares &&
      fazendaData.areaVegetacaoHectares
    ) {
      fazendaData.areaAgricultavelHectares =
        fazendaUpdate.areaAgricultavelHectares;
    }

    return this.checkAreaAgricutavelVegetacaoFazenda(fazendaData);
  }
}
