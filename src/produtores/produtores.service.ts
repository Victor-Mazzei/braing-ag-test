import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import { Produtor } from './entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.request.dto';
import { UpdateProdutorDto } from './dto/update-produtor.request.dto';
import { validCPF, validCNPJ } from '../helpers/utils';
import { ProdutorRepository } from './produtor.repository';


enum TypeIdentificationProdutor {
    CPF = "CPF",
    CNPJ = "CNPJ"
}

@Injectable()
export class ProdutoresService {
    constructor(
        @InjectRepository(Produtor)
        private produtorRepository: ProdutorRepository,
    ) {}

    async create(createProdutorDto: CreateProdutorDto): Promise<Produtor> {
        //check type
        if (!(createProdutorDto.tipoIdentificacao in TypeIdentificationProdutor)) {
            throw new BadRequestException(`Verifique os dados, ${createProdutorDto.tipoIdentificacao} não permitido.`);
        }
        
        if(!this.checkIDFiscalType(createProdutorDto)) {
            throw new BadRequestException(`Verifique os dados enviados`);
        }

        const produtor = this.produtorRepository.create(createProdutorDto);
        return this.produtorRepository.save(produtor);

       
    }

    async update(id: number, updateProdutorDto: UpdateProdutorDto): Promise<Produtor> {
        const produtor = await this.produtorRepository.findOne({ where: {
                id: id
            }
        });

        if (!produtor) {
            throw new NotFoundException(`Produtor com ID ${id} não encontrado.`);
        }

        if(updateProdutorDto.identificacaoFiscal && updateProdutorDto.tipoIdentificacao) {
            //check type
            if(!this.checkIDFiscalType(updateProdutorDto)) {
                throw new BadRequestException(`Verifique os dados enviados`);
            }
        }

         // Atualiza as propriedades do produtor
         Object.assign(produtor, updateProdutorDto);
            
         return this.produtorRepository.save(produtor);
        
        
    }


    checkIDFiscalType (produtorDto: CreateProdutorDto | UpdateProdutorDto) : Boolean {
        if(
            (produtorDto.tipoIdentificacao == TypeIdentificationProdutor.CPF && validCPF(produtorDto.identificacaoFiscal)) || 
            (produtorDto.tipoIdentificacao == TypeIdentificationProdutor.CNPJ && validCNPJ(produtorDto.identificacaoFiscal))
        ) {
            return true;
        }
        return false;
    }

    async delete(id: number): Promise<void> {
        await this.produtorRepository.delete(id);
    }

    // Outros métodos para listar, atualizar e deletar produtores
}