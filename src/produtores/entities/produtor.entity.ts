// src/produtores/entities/produtor.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Fazenda } from '../../fazendas/entities/fazenda.entity';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx_identificacao_fiscal')
  @Column({ length: 14, unique: true })
  identificacaoFiscal: string;

  @Column({ length: 4 })
  tipoIdentificacao: string;

  @Column({ length: 255 })
  nome: string;

  // Relacionamento com Fazendas
  @OneToMany(() => Fazenda, (fazenda) => fazenda.produtor, {
    onDelete: 'CASCADE',
  })
  fazendas: Fazenda[];
}
