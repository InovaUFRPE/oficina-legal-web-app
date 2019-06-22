import { Usuario } from './usuario.model';
import { Oficina } from './oficina.model';


export class Mecanico {
  id: string;
  curriculo: string;
  cpf: string;
  nome: string;
  usuario: Usuario;
  idOficina: number;
  // oficina: Oficina;
  constructor(client: Partial<Mecanico>) {
    Object.assign(this, client);
  }
}
