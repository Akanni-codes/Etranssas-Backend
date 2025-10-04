import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AgendamentoService } from '../services/agendamento.service';
import { Agendamento } from '../entities/agendamento.entity';

@Controller('/agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Agendamento[]> {
    return this.agendamentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  finId(@Body('id', ParseIntPipe) id: number): Promise<Agendamento> {
    return this.agendamentoService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() agendamento: Agendamento): Promise<Agendamento> {
    return this.agendamentoService.create(agendamento);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() agendamento: Agendamento): Promise<Agendamento> {
    return this.agendamentoService.update(agendamento);
  }
}
