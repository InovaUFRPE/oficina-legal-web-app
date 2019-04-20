export class Usuario {
  login: string;
  senha: string;
  email: string;
  constructor(usuario: Partial<Usuario>) {
    Object.assign(this, usuario);
  }
}
