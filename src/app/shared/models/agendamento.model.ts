import { Oficina } from './oficina.model';
import { Veiculo } from './veiculo.model';


export class Agendamento {
  id: string;
  data_hora: Date;
  Veiculo: Veiculo;
  constructor(client: Partial<Agendamento>) {
    Object.assign(this, client);
  }
}
