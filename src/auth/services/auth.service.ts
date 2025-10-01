import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrancistaService } from '../../trancista/services/trancista.service';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/trancistaLogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private trancistaService: TrancistaService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const buscaTrancista = await this.trancistaService.findByEmail(email);

    if (!buscaTrancista)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenha(
      password,
      buscaTrancista.senha,
    );

    if (buscaTrancista && matchPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...resposta } = buscaTrancista;
      return resposta;
    }
    return null;
  }

  async longin(trancistaLogin: UsuarioLogin) {
    const payload = { sub: trancistaLogin.usuario };
    const buscaUsuario = await this.trancistaService.findByEmail(
      trancistaLogin.usuario,
    );

    return {
      id: buscaUsuario?.id,
      nome: buscaUsuario?.nome,
      usuario: trancistaLogin.usuario,
      senha: '',
      foto: buscaUsuario?.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
