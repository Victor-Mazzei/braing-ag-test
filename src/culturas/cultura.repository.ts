import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cultura } from './entities/cultura.entity';

@Injectable()
export class CulturaRepository extends Repository<Cultura> {
  constructor(private dataSource: DataSource) {
    super(Cultura, dataSource.createEntityManager());
  }
}
