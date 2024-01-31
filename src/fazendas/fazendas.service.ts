import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFazendaDto } from './dto/create-fazenda.request.dto';
import { Fazenda } from './entities/fazenda.entity';
import { FazendaRepository } from './fazenda.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FazendasService {
    constructor(
        @InjectRepository(Fazenda)
        private fazendaRepository: FazendaRepository,
    ) {}

    async create(fazendaData: CreateFazendaDto): Promise<Fazenda> {
        if(!this.checkAreaAgricutavelVegetacaoFazenda(fazendaData)){
            throw new BadRequestException(`Área ágricutável e vegetação maior que o area total da fazenda.`);
        }
    
        const fazenda = this.fazendaRepository.create(fazendaData);
        return this.fazendaRepository.save(fazenda);
    }

    checkAreaAgricutavelVegetacaoFazenda(fazendaData: CreateFazendaDto): boolean {
        if (fazendaData.areaAgricultavelHectares + fazendaData.areaVegetacaoHectares > fazendaData.areaTotalHectares) {
            return false;
        }
        return true
    }
}
