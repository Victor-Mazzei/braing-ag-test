// src/fazendas/fazenda.repository.ts
import { Repository } from 'typeorm';
import { Fazenda } from './entities/fazenda.entity';

export class FazendaRepository extends Repository<Fazenda> {
  // Aqui você pode adicionar métodos personalizados, se necessário
}
