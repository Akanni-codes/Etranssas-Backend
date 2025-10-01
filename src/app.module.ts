import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloTran } from './modeloTran/entities/modeloTran.entity';
import { ModeloTranModule } from './modeloTran/modeloTran.module';
import { AutthModule } from './auth/auth.module';
import { Trancista } from './trancista/entities/trancista.entity';
import { TrancistaModule } from './trancista/trancista.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_etrancas',
      entities: [ModeloTran, Trancista],
      synchronize: true,
    }),
    ModeloTranModule,
    AutthModule,
    TrancistaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
