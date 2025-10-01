import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trancista } from '../entities/trancista.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class TrancistaService {
  constructor(
    @InjectRepository(Trancista)
    private trancistaRepository: Repository<Trancista>,
    private bcrypt: Bcrypt,
  ) {}

  async findByEmail(email: string): Promise<Trancista | null> {
    return await this.trancistaRepository.findOne({
      where: { email: email },
    });
  }

  async findAll(): Promise<Trancista[]> {
    return await this.trancistaRepository.find();
  }

  async findById(id: number): Promise<Trancista> {
    const trancista = await this.trancistaRepository.findOne({
      where: { id },
    });
    if (!trancista) {
      throw new HttpException('Trancista não encontrade', HttpStatus.NOT_FOUND);
    }
    return trancista;
  }

  async create(trancista: Trancista): Promise<Trancista> {
    const buscaTrancista = await this.findByEmail(trancista.email);

    if (buscaTrancista) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    trancista.senha = await this.bcrypt.criptografarSenha(trancista.senha);
    return await this.trancistaRepository.save(trancista);
  }

  async update(trancista: Trancista): Promise<Trancista> {
    await this.findById(trancista.id);
    const buscaTrancista = await this.findByEmail(trancista.email);

    if (buscaTrancista && buscaTrancista.id !== trancista.id) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    trancista.senha = await this.bcrypt.criptografarSenha(trancista.senha);
    return await this.trancistaRepository.save(trancista);
  }
}
