import { Cliente } from './cliente.model';


export class Veiculo {
  idVeiculo: number;
  modelo: string;
  ano: string;
  renavam: string;
  placa: string;
  cliente: Cliente;
  constructor(client: Partial<Veiculo>) {
    Object.assign(this, client);
  }
}
