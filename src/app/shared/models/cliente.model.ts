import { Usuario } from './usuario.model';

export class Cliente {
  id: string;
  nome: string;
  cpf: string;
  bairro: string;
  cep: number;
  endereco: string;
  complemento: string;
  usuario: Usuario;
  constructor(client: Partial<Cliente>) {
    Object.assign(this, client);
  }

}
