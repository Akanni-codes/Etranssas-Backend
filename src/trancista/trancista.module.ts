import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutthModule } from '../auth/auth.module';
import { Trancista } from './entities/trancista.entity';
import { TrancistaService } from './services/trancista.service';
import { TrancistaController } from './controllers/trancista.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trancista]),
    forwardRef(() => AutthModule),
  ],
  providers: [TrancistaService],
  controllers: [TrancistaController],
  exports: [TrancistaService],
})
export class TrancistaModule {}
