import { Usuario } from './usuario.model';


export class Oficina {
  idOficina: string;
  razaoSocial: string;
  endereco: string;
  bairro: string;
  complemento: string;
  constructor(client: Partial<Oficina>) {
    Object.assign(this, client);
  }
}
