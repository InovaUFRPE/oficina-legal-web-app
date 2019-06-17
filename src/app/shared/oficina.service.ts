import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Oficina } from './models/oficina.model';
import { AppComponent, GenericQueryParams } from '../app.component';
import { Agendamento } from './models/agendamento.model';
import { Veiculo } from './models/veiculo.model';
import { Cliente } from './models/cliente.model';



@Injectable()

export class OficinaService {
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

    getListaOficina(_parms?: GenericQueryParams): Observable<Oficina[]> {

        // return this.http.get<Oficina[]>(this.urlApi + 'oficina/findAll', {
        //     headers: this.headers,
        //     params: _parms && _parms.q ? new HttpParams().set('orderBy', _parms.q) : null
        // }).pipe(
        //     map(response => {
        //         return response as Oficina[];
        //     },
        //         error => this.handleError(error))
        // );
        // Para testes sem back:
        return of([
            new Oficina({id: '03', razaoSocial: 'Oficina do bairro', endereco: 'Rua x', bairro: 'madalena'}),
            new Oficina({id: '04', razaoSocial: 'Oficina2', endereco: 'Rua y', bairro: 'madalena'}),
            new Oficina({id: '05', razaoSocial: 'Oficina3', endereco: 'Rua z', bairro: 'madalena'})
        ]);
    }

    getOficinaById(oficinaId: string): Observable<Oficina> {
        // return this.http.get<any>(this.urlApi + 'oficina/' + oficinaId, {
        //     headers: this.headers
        // }).pipe(
        //         map(response => {
        //             return response as Oficina;
        //         },
        //             error => this.handleError(error))
        //     );
        // Para testes sem back
        return of(
            new Oficina({id: '03', razaoSocial: 'Oficina do bairro', endereco: 'Rua x', bairro: 'madalena'}));
    }

    getAgendamentosById(oficinaId: string, _parms?: GenericQueryParams): Observable<Agendamento[]> {
        // return this.http.get<any>(this.urlApi + 'agendamento/oficina/' + oficinaId, {
        //     headers: this.headers,
        //     params: _parms && _parms.q ? new HttpParams().set('orderBy', _parms.q) : null
        // }).pipe(
        //         map(response => {
        //             return response as Agendamento[];
        //         },
        //             error => this.handleError(error))
        //     );

        // Para testes sem back:
        return of([
            new Agendamento({id: '03', data_hora: new Date(),
             Veiculo: new Veiculo({placa: 'HBO-9690', modelo: 'Fusca', Cliente: new Cliente({
                nome: 'Nícolas',
                id: '04',
                cpf: '11515515' })})}),
            new Agendamento({id: '03', data_hora: new Date(),
             Veiculo: new Veiculo({placa: 'XOX-8765', modelo: 'Civic', Cliente: new Cliente({
                nome: 'Lucas',
                id: '05',
                cpf: '11515515' })})}),
            new Agendamento({id: '03', data_hora: new Date(),
             Veiculo: new Veiculo({placa: 'UHQ-9054', modelo: 'Gol', Cliente: new Cliente({
                nome: 'Bruno',
                id: '06',
                cpf: '11515515' })})}),
        ]);
    }

    createOficina(oficina: Oficina): Observable<any> {
        return this.http.post<Oficina>(this.urlApi + 'oficinas', oficina, {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Oficina;
            },
                error => this.handleError(error))
        );
    }
    updateOficina(oficina: Oficina): Observable<any> {
        return this.http.put<Oficina>(encodeURI(this.urlApi + 'oficinas/' + oficina.id), oficina, {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Oficina;
            },
                error => this.handleError(error))
        );
    }

    deleteOficina(id: string) {
        return this.http.delete<any>(encodeURI(this.urlApi + `oficinas/${id}`), {
            headers: this.headers
        })
        .pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
