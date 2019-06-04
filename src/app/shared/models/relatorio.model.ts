import { Usuario } from './usuario.model';
import { Veiculo } from './veiculo.model';


export class Relatorio {
  descricaoServico: string;
  valor: number;
  veiculo: Veiculo;
  dataInicio: string;
  dataFim:string;
  mes:string;

  constructor(client: Partial<Relatorio>) {
    Object.assign(this, client);
  }
}
