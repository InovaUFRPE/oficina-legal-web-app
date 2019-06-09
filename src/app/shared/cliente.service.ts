import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Cliente } from './models/cliente.model';
import { AppComponent } from '../app.component';



@Injectable()

export class ClienteService {
    urlApi: string;
    headers: HttpHeaders = new HttpHeaders();
    token: string;
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

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.urlApi + 'clientes', {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Cliente[];
            },
                error => this.handleError(error))
        );
    }

    getClienteById(id: string): Observable<Cliente> {
        return this.http.get<any>(this.urlApi + 'clientes/' + id, {
            headers: this.headers
        }).pipe(
                map(response => {
                    return response.data as Cliente;
                },
                    error => this.handleError(error))
            );
    }

    createCliente(cliente: Cliente): Observable<any> {
        return this.http.post<Cliente>(this.urlApi + 'clientes', cliente, {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Cliente;
            },
                error => this.handleError(error))
        );
    }
    updateCliente(cliente: Cliente): Observable<any> {
        // return this.http.put<Cliente>(encodeURI(this.urlApi + 'clientes/' + cliente.cpf), cliente, {
        //     headers: this.headers
        // }).pipe(
        //     map(response => {
        //         return response as Cliente;
        //     },
        //         error => this.handleError(error))
        // );
        // Para testes sem back:
        console.log(cliente);
        return of(cliente);
    }

    deleteCliente(cpf: string) {
        return this.http.delete<any>(encodeURI(this.urlApi + `clientes/${cpf}`), {
            headers: this.headers
        }).pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
