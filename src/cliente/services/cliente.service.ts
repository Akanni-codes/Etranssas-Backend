import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private bcrypt: Bcrypt,
  ) {}

  async findByEmail(email: string): Promise<Cliente | null> {
    return await this.clienteRepository.findOne({
      where: { email: email },
    });
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: { agendamentos: true },
    });
    if (!cliente) {
      throw new HttpException('Usuario não encontrade', HttpStatus.NOT_FOUND);
    }
    return cliente;
  }

  async create(cliente: Cliente): Promise<Cliente> {
    const buscaCliente = await this.findByEmail(cliente.email);

    if (buscaCliente) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    cliente.senha = await this.bcrypt.criptografarSenha(cliente.senha);
    return await this.clienteRepository.save(cliente);
  }

  async update(cliente: Cliente): Promise<Cliente> {
    await this.findById(cliente.id);
    const buscaCliente = await this.findByEmail(cliente.email);

    if (buscaCliente && buscaCliente.id !== cliente.id) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    cliente.senha = await this.bcrypt.criptografarSenha(cliente.senha);
    return await this.clienteRepository.save(cliente);
  }
}
