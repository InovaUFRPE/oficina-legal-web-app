import { Usuario } from './usuario.model';


export class Gestor {
  nome: string;
  cpf: string;
  usuario: Usuario;
  constructor(client: Partial<Gestor>) {
    Object.assign(this, client);
  }
}
