import { Cliente } from './cliente.model';
import { Veiculo } from './veiculo.model';
import { Laudo } from './laudo.model';


export class Relatorio {
  observacao: string;
  situacao: string;
  horaFim: Date;
  horaInicio: Date;
  Veiculo: Veiculo;
  Laudo: Laudo;

  constructor(client: Partial<Relatorio>) {
    Object.assign(this, client);
  }
}
