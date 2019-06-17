import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Mecanico } from './models/mecanico.model';
import { AppComponent } from '../app.component';



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
    return of([])
  }

  getMecanicoById(id: string): Observable<Mecanico> {
    return this.http.get<any>(this.urlApi + 'mecanicos/' + id, {
      headers: this.headers
    }).pipe(
      map(response => {
        return response.data as Mecanico;
      },
        error => this.handleError(error))
    );
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
