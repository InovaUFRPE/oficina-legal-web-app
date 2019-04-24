import { Usuario } from './usuario.model';
import { Oficina } from './oficina.model';


export class Mecanico {
  curriculo: string;
  cpf: string;
  nome: string;
  usuario: Usuario;
  oficina: Oficina;
  constructor(client: Partial<Mecanico>) {
    Object.assign(this, client);
  }
}
