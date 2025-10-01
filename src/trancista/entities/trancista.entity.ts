import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ModeloTran } from '../../modeloTran/entities/modeloTran.entity';

@Entity({ name: 'tb_trancista' })
export class Trancista {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 5000 })
  foto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valorTransporte: number;

  @OneToMany(() => ModeloTran, (modeloTran) => modeloTran.trancista)
  modeloTran: ModeloTran[];
}
