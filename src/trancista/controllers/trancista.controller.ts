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
import { TrancistaService } from '../services/trancista.service';
import { Trancista } from '../entities/trancista.entity';

@Controller('/trancistas')
export class TrancistaController {
  constructor(private readonly trancistaService: TrancistaService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Trancista[]> {
    return this.trancistaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Trancista> {
    return this.trancistaService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() trancista: Trancista): Promise<Trancista> {
    return this.trancistaService.create(trancista);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.CREATED)
  async update(@Body() trancista: Trancista): Promise<Trancista> {
    return this.trancistaService.update(trancista);
  }
}
