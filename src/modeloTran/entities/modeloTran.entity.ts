import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
