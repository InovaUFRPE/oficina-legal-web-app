import { Cliente } from './cliente.model';
import { Veiculo } from './veiculo.model';
import { Laudo } from './laudo.model';
import { Servico } from './servico.model';


export class Relatorio {
  observacao: string;
  situacao: string;
  horaFim: Date;
  horaInicio: Date;
  Veiculo: Veiculo;
  Laudo: Laudo;
  Servico: Servico;

  constructor(client: Partial<Relatorio>) {
    Object.assign(this, client);
  }
}
