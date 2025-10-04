import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloTran } from '../entities/modeloTran.entity';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class ModeloTranService {
  constructor(
    @InjectRepository(ModeloTran)
    private modeloTranRepository: Repository<ModeloTran>,
  ) {}

  async findAll(): Promise<ModeloTran[]> {
    return this.modeloTranRepository.find();
  }

  async findById(id: number): Promise<ModeloTran> {
    const modeloTran = await this.modeloTranRepository.findOne({
      where: { id },
      relations: { trancista: true },
    });

    if (!modeloTran) {
      throw new HttpException(
        'Modelo de Trança não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return modeloTran;
  }

  async findByNome(nome: string): Promise<ModeloTran[]> {
    return this.modeloTranRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(modeloTran: ModeloTran): Promise<ModeloTran> {
    return this.modeloTranRepository.save(modeloTran);
  }

  async update(modeloTran: ModeloTran): Promise<ModeloTran> {
    await this.findById(modeloTran.id);
    return await this.modeloTranRepository.save(modeloTran);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.modeloTranRepository.delete(id);
  }
}
