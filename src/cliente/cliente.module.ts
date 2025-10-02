import { forwardRef, Module } from '@nestjs/common';
import { AutthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), forwardRef(() => AutthModule)],
  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [ClienteService],
})
export class ClienteModule {}
