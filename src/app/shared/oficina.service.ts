import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Oficina } from './models/oficina.model';
import { AppComponent } from '../app.component';
import { Agendamento } from './models/agendamento.model';
import { Veiculo } from './models/veiculo.model';
import { Cliente } from './models/cliente.model';



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
            new Oficina({idOficina: '03', razaoSocial: 'Oficina do bairro', endereco: 'Rua x', bairro: 'madalena'}),
            new Oficina({idOficina: '04', razaoSocial: 'Oficina2', endereco: 'Rua y', bairro: 'madalena'}),
            new Oficina({idOficina: '05', razaoSocial: 'Oficina3', endereco: 'Rua z', bairro: 'madalena'})
        ]);
    }

    getOficinaById(oficinaId: string): Observable<Oficina> {
        // return this.http.get<any>(this.urlApi + 'oficinas/' + oficinaId)
        //     .pipe(
        //         map(response => {
        //             return response.data as Oficina;
        //         },
        //             error => this.handleError(error))
        //     );
        return of(
            new Oficina({idOficina: '03', razaoSocial: 'Oficina do bairro', endereco: 'Rua x', bairro: 'madalena'})
        );
    }

    getAgendamentosById(oficinaId: string): Observable<Agendamento[]> {
        // return this.http.get<any>(this.urlApi + 'agendamentos/' + oficinaId)
        //     .pipe(
        //         map(response => {
        //             return response.data as Agendamento[];
        //         },
        //             error => this.handleError(error))
        //     );
        return of([
            new Agendamento({idAgendamento: '03', data_hora: new Date(),
             veiculo: new Veiculo({placa: 'HBO-9690', modelo: 'Fusca', cliente: new Cliente({
                nome: 'Nícolas',
                id: '04',
                cpf: '11515515' })})}),
            new Agendamento({idAgendamento: '03', data_hora: new Date(),
             veiculo: new Veiculo({placa: 'XOX-8765', modelo: 'Civic', cliente: new Cliente({
                nome: 'Lucas',
                id: '05',
                cpf: '11515515' })})}),
            new Agendamento({idAgendamento: '03', data_hora: new Date(),
             veiculo: new Veiculo({placa: 'UHQ-9054', modelo: 'Gol', cliente: new Cliente({
                nome: 'Bruno',
                id: '06',
                cpf: '11515515' })})}),
        ]);
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
