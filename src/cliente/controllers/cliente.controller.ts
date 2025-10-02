import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';

@Controller('/clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.CREATED)
  async update(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(cliente);
  }
}
