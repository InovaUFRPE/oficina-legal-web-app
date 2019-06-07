export class Usuario {
  id: number;
  login: string;
  senha: string;
  email: string;
  tipo: string;
  constructor(usuario: Partial<Usuario>) {
    Object.assign(this, usuario);
  }
}
