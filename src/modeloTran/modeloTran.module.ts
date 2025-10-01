import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloTran } from './entities/modeloTran.entity';
import { ModeloTranService } from './services/modeloTran.service';
import { ModeloTranController } from './controllers/modeloTran.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModeloTran])],
  providers: [ModeloTranService],
  controllers: [ModeloTranController],
  exports: [],
})
export class ModeloTranModule {}
