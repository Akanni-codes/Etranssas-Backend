import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { TrancistaModule } from '../trancista/trancista.module';
import { AgendamentoService } from './services/agendamento.service';
import { AgendamentoController } from './controllers/agendamento.controller';
import { ModeloTranModule } from '../modeloTran/modeloTran.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamento]),
    TrancistaModule,
    ModeloTranModule,
  ],
  providers: [AgendamentoService],
  controllers: [AgendamentoController],
  exports: [AgendamentoService],
})
export class AgendamentoModule {}
