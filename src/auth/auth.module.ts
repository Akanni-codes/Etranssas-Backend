import { forwardRef, Module } from '@nestjs/common';
import { TrancistaModule } from '../trancista/trancista.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { Bcrypt } from './bcrypt/bcrypt';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    forwardRef(() => TrancistaModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [Bcrypt, AuthService],
  exports: [Bcrypt],
})
export class AutthModule {}
