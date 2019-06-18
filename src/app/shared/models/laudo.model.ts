export class Laudo {
  id: number;
  descricao: string;
  dataHora: Date;
  idVeiculo: number;

  constructor(client: Partial<Laudo>) {
    Object.assign(this, client);
  }
}
