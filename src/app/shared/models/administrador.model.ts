import { Usuario } from './usuario.model';

export class Administrador {
  nome: string;
  cpf: string;
  usuario: Usuario;
  constructor(admin: Partial<Administrador>) {
    Object.assign(this, admin);
  }
}
