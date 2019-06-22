export class Servico {
    nomeServico: string;
    preco: number;
    tempoRealizacao: string;


  constructor(client: Partial<Servico>) {
    Object.assign(this, client);
  }
}
