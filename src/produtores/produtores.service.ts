import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import { Produtor } from './entities/produtor.entity';
import { CreateProdutorDTO } from './dto/create-produtor.dto';
import { UpdateProdutorDTO } from './dto/update-produtor.dto';
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

    async create(createProdutorDTO: CreateProdutorDTO): Promise<Produtor> {
        //check type
        if (!(createProdutorDTO.tipoIdentificacao in TypeIdentificationProdutor)) {
            throw new BadRequestException(`Verifique os dados, ${createProdutorDTO.tipoIdentificacao} não permitido.`);
        }
        
        if(!this.checkIDFiscalType(createProdutorDTO)) {
            throw new BadRequestException(`Verifique os dados enviados`);
        }

        const produtor = this.produtorRepository.create(createProdutorDTO);
        return this.produtorRepository.save(produtor);

       
    }

    async update(id: number, updateProdutorDTO: UpdateProdutorDTO): Promise<Produtor> {
        const produtor = await this.produtorRepository.findOne({ where: {
                id: id
            }
        });

        if (!produtor) {
            throw new NotFoundException(`Produtor com ID ${id} não encontrado.`);
        }

        if(updateProdutorDTO.identificacaoFiscal && updateProdutorDTO.tipoIdentificacao) {
            //check type
            if(!this.checkIDFiscalType(updateProdutorDTO)) {
                throw new BadRequestException(`Verifique os dados enviados`);
            }
        }

         // Atualiza as propriedades do produtor
         Object.assign(produtor, updateProdutorDTO);
            
         return this.produtorRepository.save(produtor);
        
        
    }


    private checkIDFiscalType (produtorDTO: CreateProdutorDTO | UpdateProdutorDTO) : Boolean {
        if(
            (produtorDTO.tipoIdentificacao == TypeIdentificationProdutor.CPF && validCPF(produtorDTO.identificacaoFiscal)) || 
            (produtorDTO.tipoIdentificacao == TypeIdentificationProdutor.CNPJ && validCNPJ(produtorDTO.identificacaoFiscal))
        ) {
            return true;
        }
        return false;
    }

    // Outros métodos para listar, atualizar e deletar produtores
}