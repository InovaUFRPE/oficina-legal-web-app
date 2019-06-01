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

@Injectable()

export class LoginService {

    constructor(private readonly http: HttpClient) { }

    private handleError(error: any): Observable<any> {
        if (error.status === 0) {
            return Observable.throw('Erro de conexão.');
        }

        return Observable.throw((error.json().Message ? error.json().Message : error.json().error_description));
    }

    loginUsuario(user: Usuario): Observable<any> {
        // return this.http.post<any>(urlApi + 'login', user)
        //     .pipe(
        //         map(response => {
        //             return response as any;
        //         },
        //             error => this.handleError(error))
        //     );
        // Para testes sem back:
        switch (user.tipo) {
            case '01':
                return of(new Cliente ({
                    nome: 'Nícolas',
                    id: '02',
                    cpf: '11515515',
                    usuario: user
                }));
                break;
            case '02':
                return of(new Mecanico ({
                    nome: 'Nícolas',
                    id: '02',
                    cpf: '654545',
                    curriculo: 'asashuashuashuashuashuashuashuashushua',
                    usuario: user
                }));
                break;
             case '03':
                return of(new Gestor ({
                    nome: 'Nícolas',
                    id: '02',
                    cpf: '5454',
                    usuario: user,
                    oficina: new Oficina({idOficina: '03', razaoSocial: 'Oficina do bairro', endereco: 'Rua x', bairro: 'madalena'})
                }));
                break;
            case '04':
                return of(new Administrador ({
                    nome: 'Nícolas',
                    cpf: '45544',
                    usuario: user
                }));
                break;
            default:
                break;
        }
    }

}
