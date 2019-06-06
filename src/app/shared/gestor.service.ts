import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Gestor } from './models/gestor.model';
import { AppComponent } from '../app.component';



@Injectable()

export class GestorService {
    urlApi: string;
    token: string;
    headers: HttpHeaders;
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

    getGestores(): Observable<Gestor[]> {
        return this.http.get<Gestor[]>(this.urlApi + 'gestores', {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Gestor[];
            },
                error => this.handleError(error))
        );
    }

    getGestorById(id: string): Observable<Gestor> {
        return this.http.get<any>(this.urlApi + 'gestores/' + id, {
            headers: this.headers
        }).pipe(
                map(response => {
                    return response.data as Gestor;
                },
                    error => this.handleError(error))
            );
    }

    createGestor(gestor: Gestor): Observable<any> {
        return this.http.post<Gestor>(this.urlApi + 'gestores', gestor, {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Gestor;
            },
                error => this.handleError(error))
        );
    }
    updateGestor(gestor: Gestor): Observable<any> {
        // return this.http.put<Gestor>(encodeURI(this.urlApi + 'gestores/' + gestor.cpf), gestor, {
        //     headers: this.headers
        // }).pipe(
        //     map(response => {
        //         return response as Gestor;
        //     },
        //         error => this.handleError(error))
        // );
        // Para testes sem back:
        return of(gestor);
    }

    deleteGestor(cpf: string) {
        return this.http.delete<any>(encodeURI(this.urlApi + `gestores/${cpf}`), {
            headers: this.headers
        }).pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
