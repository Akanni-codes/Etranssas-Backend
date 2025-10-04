import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from '../entities/agendamento.entity';
import { Repository } from 'typeorm';
import { ModeloTranService } from '../../modeloTran/services/modeloTran.service';
import { TrancistaService } from '../../trancista/services/trancista.service';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,
    private modeloTanService: ModeloTranService,
    private trancistaService: TrancistaService,
  ) {}
  async findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: { cliente: true, modeloTran: true, trancista: true },
    });
  }

  async findById(id: number): Promise<Agendamento> {
    const agedamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: { cliente: true, modeloTran: true, trancista: true },
    });
    if (!agedamento) {
      throw new HttpException(
        'Agendamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return agedamento;
  }

  async create(agendamento: Agendamento): Promise<Agendamento> {
    await this.trancistaService.findById(agendamento.trancista.id);
    await this.modeloTanService.findById(agendamento.modeloTran.id);

    agendamento.valorTotal = await this.calcularValorTotal(
      agendamento.modeloTran.id,
      agendamento.trancista.id,
      agendamento.materialIncluso,
    );
    return this.agendamentoRepository.save(agendamento);
  }

  async update(agendamento: Agendamento): Promise<Agendamento> {
    await this.findById(agendamento.id);

    agendamento.valorTotal = await this.calcularValorTotal(
      agendamento.modeloTran.id,
      agendamento.trancista.id,
      agendamento.materialIncluso,
    );
    return await this.agendamentoRepository.save(agendamento);
  }

  async calcularValorTotal(
    modeloId: number,
    trancistaId: number,
    material: boolean,
  ): Promise<number> {
    const modelo = await this.modeloTanService.findById(modeloId);
    const trancista = await this.trancistaService.findById(trancistaId);

    // Converter DECIMAL (retornado como string pelo TypeORM) para number
    const toNumber = (v: any): number => {
      if (typeof v === 'number') return v;
      if (typeof v === 'string') {
        const cleaned = v.replace(/,/g, '').trim();
        const n = Number(cleaned);
        return Number.isNaN(n) ? 0 : n;
      }
      return 0;
    };

    const preco = toNumber(modelo.preco);
    const valorMaterial = toNumber(modelo.taxaMaterial);
    const valorTransporte = toNumber(trancista.valorTransporte);

    let total = preco + valorTransporte;
    if (material) total = preco + valorMaterial + valorTransporte;

    const arredondado = Math.round((total + Number.EPSILON) * 100) / 100;

    if (!Number.isFinite(arredondado)) {
      throw new HttpException(
        'Erro ao calcular valor total',
        HttpStatus.BAD_REQUEST,
      );
    }

    return arredondado;
  }
}
