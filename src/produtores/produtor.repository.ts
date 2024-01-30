// src/produtores/produtor.repository.ts
import { Repository } from 'typeorm';
import { Produtor } from './entities/produtor.entity';

export class ProdutorRepository extends Repository<Produtor> {}
