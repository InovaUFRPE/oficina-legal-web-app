import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from './models/usuario.model';
import { Cliente } from './models/cliente.model';
import { Mecanico } from './models/mecanico.model';
import { Gestor } from './models/gestor.model';
import { Administrador } from './models/administrador.model';
import { Oficina } from './models/oficina.model';

const urlApi = 'http://104.236.120.141:4000/api/';

export interface RetornoLogin {
  token: string;
  user: Usuario;
}
@Injectable()

export class LoginService {

  constructor(private readonly http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    if (error.status === 0) {
      return Observable.throw('Erro de conexão.');
    }

    return Observable.throw((error.json().Message ? error.json().Message : error.json().error_description));
  }

  loginUsuario(user: Usuario): Observable<RetornoLogin> {
    return this.http.post<any>(urlApi + 'usuario/login', user)
        .pipe(
            map(response => {
                return response as RetornoLogin;
            },
                error => this.handleError(error))
    );
  }

  getUsuarioCompleto(idUser: number): Observable<any> {
    return this.http.get<any>(urlApi + 'usuario/admin/' + idUser)
        .pipe(
            map(response => {
                return response as any;
            },
                error => this.handleError(error))
        );
  }
}
