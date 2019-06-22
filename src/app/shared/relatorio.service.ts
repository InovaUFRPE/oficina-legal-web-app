import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Relatorio } from './models/relatorio.model';
import { AppComponent } from '../app.component';



@Injectable()
export class RelatorioService {
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

    getRelatorioFinanceiro(idOficina: string): Observable<any[]> {
        return this.http.get<Relatorio[]>(this.urlApi + `os/oficina/${idOficina}`, {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Relatorio[];
            },
                error => this.handleError(error))
        );
    }

}
