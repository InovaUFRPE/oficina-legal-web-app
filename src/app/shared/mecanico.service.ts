import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Mecanico } from './models/mecanico.model';
import { AppComponent } from '../app.component';



@Injectable()

export class MecanicoService {
    urlApi: string;
    constructor(private readonly http: HttpClient, private readonly app: AppComponent) {
        this.urlApi = this.app.urlApi;
    }

    private handleError(error: any): Observable<any> {
        if (error.status === 0) {
            return Observable.throw('Erro de conexão.');
        }

        return Observable.throw((error.json().Message ? error.json().Message : error.json().error_description));
    }

    getMecanicos(): Observable<Mecanico[]> {
        return this.http.get<Mecanico[]>(this.urlApi + 'mecanicos')
        .pipe(
            map(response => {
                return response as Mecanico[];
            },
                error => this.handleError(error))
        );
    }

    getMecanicoById(id: string): Observable<Mecanico> {
        return this.http.get<any>(this.urlApi + 'mecanicos/' + id)
            .pipe(
                map(response => {
                    return response.data as Mecanico;
                },
                    error => this.handleError(error))
            );
    }

    createMecanico(mecanico: Mecanico): Observable<any> {
        return this.http.post<Mecanico>(this.urlApi + 'mecanicos', mecanico)
        .pipe(
            map(response => {
                return response as Mecanico;
            },
                error => this.handleError(error))
        );
    }
    updateMecanico(mecanico: Mecanico): Observable<any> {
        // return this.http.put<Mecanico>(encodeURI(this.urlApi + 'mecanicos/' + mecanico.cpf), mecanico)
        // .pipe(
        //     map(response => {
        //         return response as Mecanico;
        //     },
        //         error => this.handleError(error))
        // );
        // Para testes sem back:
        return of(mecanico);
    }

    deleteMecanico(cpf: string) {
        return this.http.delete<any>(encodeURI(this.urlApi + `mecanicos/${cpf}`), )
        .pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
