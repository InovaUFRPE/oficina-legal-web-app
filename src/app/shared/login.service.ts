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

const urlApi = 'http://localhost:5000/api/';

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
        // return this.http.post<any>(urlApi + 'login', user)
        //     .pipe(
        //         map(response => {
        //             return response as RetornoLogin;
        //         },
        //             error => this.handleError(error))
        // );
        // Para testes sem back:
        return of({
            token: 'string',
            user: new Usuario({id: 2, tipo: '03', login: 'nicolas', email: 'nicolas@gmail.com'})
        } as RetornoLogin);
    }

    getUsuarioCompleto(idUser: number): Observable<any> {
        // return this.http.get<any>(urlApi + 'get-user/' + idUser)
        //     .pipe(
        //         map(response => {
        //             return response as any;
        //         },
        //             error => this.handleError(error))
        //     );

        // return of(new Gestor ({
        //     nome: 'Nícolas',
        //     id: '02',
        //     cpf: '5454',
        //     usuario: new Usuario({id: 2, tipo: '03', login: 'nicolas', email: 'nicolas@gmail.com'}),
        //     oficina: new Oficina({idOficina: '03', razaoSocial: 'Oficina do bairro', endereco: 'Rua x', bairro: 'madalena'})
        // }));

        return of(new Administrador ({
            nome: 'Nícolas',
            cpf: '45544',
            usuario: new Usuario({id: 2, tipo: '04', login: 'nicolas', email: 'nicolas@gmail.com'})
        }));
    }
}
