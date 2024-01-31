// src/fazendas/entities/fazenda.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  RelationId,
} from 'typeorm';
import { Produtor } from '../../produtores/entities/produtor.entity';

@Entity()
export class Fazenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  cidade: string;

  @Column({ length: 255 })
  estado: string;

  @Column('decimal', { precision: 10, scale: 2 })
  areaTotalHectares: number;

  @Column('decimal', { precision: 10, scale: 2 })
  areaAgricultavelHectares: number;

  @Column('decimal', { precision: 10, scale: 2 })
  areaVegetacaoHectares: number;

  @ManyToOne(() => Produtor, (produtor) => produtor.fazendas)
  produtor: Produtor;

  @Index('idx_produtor_id')
  @RelationId((fazenda: Fazenda) => fazenda.produtor)
  produtorId: number;
}
