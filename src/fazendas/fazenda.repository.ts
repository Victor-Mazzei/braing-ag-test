import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Fazenda } from './entities/fazenda.entity';

@Injectable()
export class FazendaRepository extends Repository<Fazenda> {
  constructor(private dataSource: DataSource) {
    super(Fazenda, dataSource.createEntityManager());
  }
}
