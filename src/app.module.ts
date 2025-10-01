import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloTran } from './modeloTran/entities/modeloTran.entity';
import { ModeloTranModule } from './modeloTran/modeloTran.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_etrancas',
      entities: [ModeloTran],
      synchronize: true,
    }),
    ModeloTranModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
