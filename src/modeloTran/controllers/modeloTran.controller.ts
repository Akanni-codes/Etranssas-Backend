import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ModeloTranService } from '../services/modeloTran.service';
import { ModeloTran } from '../entities/modeloTran.entity';

@Controller('/modelos')
export class ModeloTranController {
  constructor(private readonly modeloTranService: ModeloTranService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ModeloTran[]> {
    return this.modeloTranService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ModeloTran> {
    return this.modeloTranService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<ModeloTran[]> {
    return this.modeloTranService.findByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() modeloTran: ModeloTran): Promise<ModeloTran> {
    return this.modeloTranService.create(modeloTran);
  }

  @Put()
  @HttpCode(HttpStatus.CREATED)
  update(@Body() modeloTran: ModeloTran): Promise<ModeloTran> {
    return this.modeloTranService.update(modeloTran);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.modeloTranService.delete(id);
  }
}
