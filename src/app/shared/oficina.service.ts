import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Oficina } from './models/oficina.model';
import { AppComponent } from '../app.component';



@Injectable()

export class OficinaService {
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

    getOficinas(): Observable<Oficina[]> {
        // return this.http.get<Oficina[]>(this.urlApi + 'oficinas')
        // .pipe(
        //     map(response => {
        //         return response as Oficina[];
        //     },
        //         error => this.handleError(error))
        // );
        // Para testes sem back:
        return of([
            new Oficina({razaoSocial: 'disney', endereco: 'disneysss'}),
            new Oficina({razaoSocial: 'disney2', endereco: 'disneyss4s'}),
            new Oficina({razaoSocial: 'disney3', endereco: 'disneysss4'})
        ]);
    }

    getOficinaById(oficinaId: string): Observable<Oficina> {
        return this.http.get<any>(this.urlApi + 'oficinas/' + oficinaId)
            .pipe(
                map(response => {
                    return response.data as Oficina;
                },
                    error => this.handleError(error))
            );
    }

    createOficina(oficina: Oficina): Observable<any> {
        return this.http.post<Oficina>(this.urlApi + 'oficinas', oficina)
        .pipe(
            map(response => {
                return response as Oficina;
            },
                error => this.handleError(error))
        );
    }
    updateOficina(oficina: Oficina): Observable<any> {
        return this.http.put<Oficina>(encodeURI(this.urlApi + 'oficinas/' + oficina.idOficina), oficina)
        .pipe(
            map(response => {
                return response as Oficina;
            },
                error => this.handleError(error))
        );
    }

    deleteOficina(idOficina: string) {
        return this.http.delete<any>(encodeURI(this.urlApi + `oficinas/${idOficina}`), )
        .pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
