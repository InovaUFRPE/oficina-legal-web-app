import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Gestor } from './models/gestor.model';
import { Veiculo } from './models/veiculo.model';
import { Cliente } from './models/cliente.model';
import { Relatorio } from './models/relatorio.model';
import { AppComponent } from '../app.component';



@Injectable()

export class GestorService {
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

    getGestores(): Observable<Gestor[]> {
        return this.http.get<Gestor[]>(this.urlApi + 'gestor', {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Gestor[];
            },
                error => this.handleError(error))
        );
    }

    getGestorById(id: string): Observable<Gestor> {
        return this.http.get<any>(this.urlApi + 'gestor/' + id, {
            headers: this.headers
        }).pipe(
                map(response => {
                    console.log(response);
                    return response as Gestor;
                },
                    error => this.handleError(error))
            );
    }

    createGestor(gestor: Gestor): Observable<any> {
        return this.http.post<Gestor>(this.urlApi + 'gestor', gestor, {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Gestor;
            },
                error => this.handleError(error))
        );
    }


    getRelatorioFinanceiro(): Observable<any[]> {
        return this.http.get<Relatorio[]>(this.urlApi + 'os/oficina/71', {
            headers: this.headers
        }).pipe(
            map(response => {
                return response as Relatorio[];
            },
                error => this.handleError(error))
        );
        // return of([
        //     new Relatorio({descricaoServico: 'Troca de óleo do motor', valor: 200,
        //      veiculo: new Veiculo({placa: 'TTB-8182', modelo: 'Hilux', Cliente: new Cliente({
        //         nome: 'Carlinhos bala',
        //         id: '01',
        //         cpf: '11515515' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Conserto de motor avariado', valor: 1500,
        //      veiculo: new Veiculo({placa: 'HSA-9330', modelo: 'Sentra', Cliente: new Cliente({
        //         nome: 'Joaozinho play',
        //         id: '02',
        //         cpf: '08967297459' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Troca de caixa de marcha', valor: 1100,
        //      veiculo: new Veiculo({placa: 'HBO-0158', modelo: 'Sandeiro', Cliente: new Cliente({
        //         nome: 'Nícolas',
        //         id: '03',
        //         cpf: '11515515' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Troca de óleo do motor', valor: 200,
        //      veiculo: new Veiculo({placa: 'BCT-9690', modelo: 'Fusca', Cliente: new Cliente({
        //         nome: 'Fumagali Barreto',
        //         id: '04',
        //         cpf: '11515515' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Colocar arcondicionado de anteiro', valor: 200,
        //      veiculo: new Veiculo({placa: 'BBL-9290', modelo: 'S10', Cliente: new Cliente({
        //         nome: 'Carlos Alcantara',
        //         id: '05',
        //         cpf: '121241411' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Adição de gps no banco do motorista', valor: 600,
        //      veiculo: new Veiculo({placa: 'LLA-8883', modelo: 'Celtinha humilde', Cliente: new Cliente({
        //         nome: 'Gabriel',
        //         id: '06',
        //         cpf: '221018281' })
        //     })}),
        //     new Relatorio({descricaoServico: 'troca de obstrução obstreta de pneu furado', valor: 1250,
        //      veiculo: new Veiculo({placa: 'LBT-5521', modelo: 'Sandeiro', Cliente: new Cliente({
        //         nome: 'Alberto Silva',
        //         id: '03',
        //         cpf: '11515515' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Troca de óleo do motor', valor: 200,
        //      veiculo: new Veiculo({placa: 'BCT-9690', modelo: 'Fusca', Cliente: new Cliente({
        //         nome: 'Fumagali Barreto',
        //         id: '04',
        //         cpf: '11515515' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Colocar arcondicionado de anteiro', valor: 200,
        //      veiculo: new Veiculo({placa: 'BBL-9290', modelo: 'S10', Cliente: new Cliente({
        //         nome: 'Carlos Alcantara',
        //         id: '05',
        //         cpf: '121241411' })
        //     })}),
        //     new Relatorio({descricaoServico: 'Adição de gps no banco do motorista', valor: 600,
        //      veiculo: new Veiculo({placa: 'LLA-8883', modelo: 'Celtinha humilde', Cliente: new Cliente({
        //         nome: 'Gabriel',
        //         id: '06',
        //         cpf: '221018281' })
        //     })}),
        // ]);
    }

    updateGestor(gestor: Gestor): Observable<any> {
        // return this.http.put<Gestor>(encodeURI(this.urlApi + 'gestor/' + gestor.cpf), gestor, {
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
        return this.http.delete<any>(encodeURI(this.urlApi + `gestor/${cpf}`), {
            headers: this.headers
        }).pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
