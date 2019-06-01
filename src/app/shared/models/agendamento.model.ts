import { Oficina } from './oficina.model';
import { Veiculo } from './veiculo.model';


export class Agendamento {
  idAgendamento: string;
  data_hora: Date;
  veiculo: Veiculo;
  oficina: Oficina;
  constructor(client: Partial<Agendamento>) {
    Object.assign(this, client);
  }
}
