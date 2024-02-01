import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Produtor } from './entities/produtor.entity';

@Injectable()
export class ProdutorRepository extends Repository<Produtor> {
  constructor(private dataSource: DataSource) {
    super(Produtor, dataSource.createEntityManager());
  }
}
