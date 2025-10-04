import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { ModeloTran } from '../../modeloTran/entities/modeloTran.entity';
import { Trancista } from '../../trancista/entities/trancista.entity';

@Entity({ name: 'tb_agendamentos' })
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trancista, (trancista) => trancista.agendamentos)
  trancista: Trancista;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos)
  cliente: Cliente;

  @ManyToOne(() => ModeloTran, (modeloTran) => modeloTran.agendamentos)
  modeloTran: ModeloTran;

  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  endereco: string;

  @IsNotEmpty()
  @Column({ type: 'timestamp', nullable: false })
  dataAgendada: Timestamp;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataPedido: Timestamp;

  @IsNotEmpty()
  @Column({ type: 'boolean', default: true })
  materialIncluso: boolean;

  @Column({ type: 'boolean', default: false })
  confirmado: boolean;

  @Column({ type: 'boolean', default: false })
  sinalPago: boolean;

  @Column({ type: 'boolean', default: false })
  finalizado: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorTotal: number;
}
