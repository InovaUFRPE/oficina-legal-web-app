import { Usuario } from './usuario.model';
import { Oficina } from './oficina.model';


export class Gestor {
  nome: string;
  cpf: string;
  usuario: Usuario;
  oficina: Oficina;
  constructor(client: Partial<Gestor>) {
    Object.assign(this, client);
  }
}
