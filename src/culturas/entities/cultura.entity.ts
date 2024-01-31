import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Fazenda } from '../../fazendas/entities/fazenda.entity';

@Entity()
export class Cultura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    nome: string;

    @ManyToMany(() => Fazenda)
    @JoinTable({
        name: 'fazenda_culturas',
        joinColumn: { name: 'cultura_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'fazenda_id', referencedColumnName: 'id' }
    })
    fazendas: Fazenda[];
}
