import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trancista } from '../../trancista/entities/trancista.entity';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';

@Entity({ name: 'tb_modelo_tran' })
export class ModeloTran {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @Column({ length: 5000 })
  foto: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ length: 5000 })
  descricao: string;

  @ManyToOne(() => Trancista, (trancista) => trancista.modeloTran, {
    onDelete: 'CASCADE',
  })
  trancista: Trancista;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.modeloTran)
  agendamentos: Agendamento[];
}
