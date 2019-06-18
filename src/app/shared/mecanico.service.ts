import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Mecanico } from './models/mecanico.model';
import { AppComponent } from '../app.component';
import { Usuario } from './models/usuario.model';
import { Oficina } from './models/oficina.model';



@Injectable()

export class MecanicoService {
  urlApi: string;
  token: string;
  headers: HttpHeaders = new HttpHeaders();
  constructor(private readonly http: HttpClient, private readonly app: AppComponent) {
    this.urlApi = this.app.urlApi;
    this.token = this.app.token;
    this.headers = this.headers.append('x-access-token', this.token);
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 0) {
      return Observable.throw('Erro de conexão.');
    }

    return Observable.throw((error.json().Message ? error.json().Message : error.json().error_description));
  }

  getMecanicos(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(this.urlApi + 'mecanicos', {
      headers: this.headers
    }).pipe(
      map(response => {
        return response as Mecanico[];
      },
        error => this.handleError(error))
    );
  }

  getMecanicosByOficina(id: string): Observable<Mecanico[]> {
    // return this.http.get<Mecanico[]>(this.urlApi + 'mecanicos', {
    //   headers: this.headers
    // }).pipe(
    //   map(response => {
    //     return response as Mecanico[];
    //   },
    //     error => this.handleError(error))
    // );
    return of([new Mecanico({
      id: '1',
      curriculo: 'string',
      cpf: '99999999',
      nome: 'Hugo',
      usuario: new Usuario({
        id: 1,
        login: 'hugo',
        senha: '123456',
        email: 'hugosteixeira@hotmail.com ',
        tipo: '04',
      }),
      oficina: new Oficina({
        id: '1',
        razaoSocial: 'jsahd',
        endereco: 'askdjhgsa',
        bairro: 'lksjhd',
        complemento: 'kjshdf'
      })
    }),
    new Mecanico({
      id: '2',
      curriculo: 'string',
      cpf: '99999999',
      nome: 'Hugo',
      usuario: new Usuario({
        id: 2,
        login: 'hugo',
        senha: '123456',
        email: 'hugosteixeira@hotmail.com ',
        tipo: '04',
      }),
      oficina: new Oficina({
        id: '2',
        razaoSocial: 'jsahd',
        endereco: 'askdjhgsa',
        bairro: 'lksjhd',
        complemento: 'kjshdf'
      })
    })]);
  }

    getMecanicoById(id: string): Observable<Mecanico> {
        // return this.http.get<any>(this.urlApi + 'mecanicos/' + id, {
        //     headers: this.headers
        // }).pipe(
        //         map(response => {
        //             return response.data as Mecanico;
        //         },
        //             error => this.handleError(error))
        //     );
        return of(new Mecanico({cpf: '151.456.448-70', id: '02', nome: 'Jonathan', oficina: new Oficina({
          id: '2',
          razaoSocial: 'jsahd',
          endereco: 'askdjhgsa',
          bairro: 'lksjhd',
          complemento: 'kjshdf'
        }),
        usuario: new Usuario({id: 2, tipo: '03', login: 'jonathan', email: 'jonathan@gmail.com'}), }));
    }

  createMecanico(mecanico: Mecanico): Observable<any> {
    return this.http.post<Mecanico>(this.urlApi + 'mecanicos', mecanico, {
      headers: this.headers
    }).pipe(
      map(response => {
        return response as Mecanico;
      },
        error => this.handleError(error))
    );
  }
  updateMecanico(mecanico: Mecanico): Observable<any> {
    // return this.http.put<Mecanico>(encodeURI(this.urlApi + 'mecanicos/' + mecanico.cpf), mecanico, {
    //     headers: this.headers
    // }).pipe(
    //     map(response => {
    //         return response as Mecanico;
    //     },
    //         error => this.handleError(error))
    // );
    // Para testes sem back:
    return of(mecanico);
  }

  deleteMecanico(cpf: string) {
    return this.http.delete<any>(encodeURI(this.urlApi + `mecanicos/${cpf}`), {
      headers: this.headers
    }).pipe(
      map(response => {
        return response;
      },
        error => this.handleError(error))
    );
  }
}
