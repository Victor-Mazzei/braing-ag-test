// src/produtores/entities/produtor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fazenda } from '../../fazendas/entities/fazenda.entity';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 14, unique: true })
  identificacaoFiscal: string;

  @Column({ length: 4 })
  tipoIdentificacao: string;

  @Column({ length: 255 })
  nome: string;

  // Relacionamento com Fazendas
  @OneToMany(() => Fazenda, (fazenda) => fazenda.produtor)
  fazendas: Fazenda[];
}
