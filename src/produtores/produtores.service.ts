import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produtor } from './entities/produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.request.dto';
import { UpdateProdutorDto } from './dto/update-produtor.request.dto';
import { validCPF, validCNPJ } from '../helpers/utils';
import { ProdutorRepository } from './produtor.repository';
import TipoIdentificaoProdutor from '../enums/tipoIdentificacaoProdutor';
import {
  ProdutorBadRequestException,
  ProdutorNotFoundException,
} from 'src/exceptions/produtor.exception';

@Injectable()
export class ProdutoresService {
  constructor(
    @InjectRepository(Produtor)
    private produtorRepository: ProdutorRepository,
  ) {}

  async create(createProdutorDto: CreateProdutorDto): Promise<Produtor> {
    //check type
    if (!(createProdutorDto.tipoIdentificacao in TipoIdentificaoProdutor)) {
      throw new ProdutorBadRequestException();
    }

    if (!this.checkIDFiscalType(createProdutorDto)) {
      throw new ProdutorBadRequestException();
    }

    const produtor = this.produtorRepository.create(createProdutorDto);
    return this.produtorRepository.save(produtor);
  }

  async update(
    id: number,
    updateProdutorDto: UpdateProdutorDto,
  ): Promise<Produtor> {
    const produtor = await this.produtorRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!produtor) {
      throw new ProdutorNotFoundException();
    }

    if (
      updateProdutorDto.identificacaoFiscal &&
      updateProdutorDto.tipoIdentificacao
    ) {
      //check type
      if (!this.checkIDFiscalType(updateProdutorDto)) {
        throw new ProdutorBadRequestException();
      }
    }

    // Atualiza as propriedades do produtor
    Object.assign(produtor, updateProdutorDto);

    return this.produtorRepository.save(produtor);
  }

  checkIDFiscalType(
    produtorDto: CreateProdutorDto | UpdateProdutorDto,
  ): boolean {
    if (
      (produtorDto.tipoIdentificacao == TipoIdentificaoProdutor.CPF &&
        validCPF(produtorDto.identificacaoFiscal)) ||
      (produtorDto.tipoIdentificacao == TipoIdentificaoProdutor.CNPJ &&
        validCNPJ(produtorDto.identificacaoFiscal))
    ) {
      return true;
    }
    return false;
  }

  async delete(id: number): Promise<void> {
    await this.produtorRepository.delete(id);
  }
}
