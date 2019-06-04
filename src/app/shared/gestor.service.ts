import { HttpClient } from '@angular/common/http';
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
    constructor(private readonly http: HttpClient, private readonly app: AppComponent) {
        this.urlApi = this.app.urlApi;
    }

    private handleError(error: any): Observable<any> {
        if (error.status === 0) {
            return Observable.throw('Erro de conexão.');
        }

        return Observable.throw((error.json().Message ? error.json().Message : error.json().error_description));
    }

    getGestores(): Observable<Gestor[]> {
        return this.http.get<Gestor[]>(this.urlApi + 'gestores')
        .pipe(
            map(response => {
                return response as Gestor[];
            },
                error => this.handleError(error))
        );
    }

    getGestorByCpf(cpf: string): Observable<Gestor> {
        return this.http.get<any>(this.urlApi + 'gestores/' + cpf)
            .pipe(
                map(response => {
                    return response.data as Gestor;
                },
                    error => this.handleError(error))
            );
    }

    createGestor(gestor: Gestor): Observable<any> {
        return this.http.post<Gestor>(this.urlApi + 'gestores', gestor)
        .pipe(
            map(response => {
                return response as Gestor;
            },
                error => this.handleError(error))
        );
    }


    getRelatorioFinanceiro(oficinaId: string,mes : string): Observable<Relatorio[]> {
        let url = this.urlApi + 'Relatorios/' + oficinaId  + '/' ;

            url = url + mes + '/' ;
            console.log(url);
        
        // return this.http.get<any>(url)
        //     .pipe(
        //         map(response => {
        //             return response.data as Relatorio[];
        //         },
        //             error => this.handleError(error))
        //     );
        return of([
            new Relatorio({descricaoServico: 'Troca de óleo do motor', valor: 200,
             veiculo: new Veiculo({placa: 'TTB-8182', modelo: 'Hilux', cliente: new Cliente({
                nome: 'Carlinhos bala',
                id: '01',
                cpf: '11515515' })
            })}),
            new Relatorio({descricaoServico: 'Conserto de motor avariado', valor: 1500,
             veiculo: new Veiculo({placa: 'HSA-9330', modelo: 'Sentra', cliente: new Cliente({
                nome: 'Joaozinho play',
                id: '02',
                cpf: '08967297459' })
            })}),
            new Relatorio({descricaoServico: 'Troca de caixa de marcha', valor: 1100,
             veiculo: new Veiculo({placa: 'HBO-0158', modelo: 'Sandeiro', cliente: new Cliente({
                nome: 'Nícolas',
                id: '03',
                cpf: '11515515' })
            })}),
            new Relatorio({descricaoServico: 'Troca de óleo do motor', valor: 200,
             veiculo: new Veiculo({placa: 'BCT-9690', modelo: 'Fusca', cliente: new Cliente({
                nome: 'Fumagali Barreto',
                id: '04',
                cpf: '11515515' })
            })}),
            new Relatorio({descricaoServico: 'Colocar arcondicionado de anteiro', valor: 200,
             veiculo: new Veiculo({placa: 'BBL-9290', modelo: 'S10', cliente: new Cliente({
                nome: 'Carlos Alcantara',
                id: '05',
                cpf: '121241411' })
            })}),
            new Relatorio({descricaoServico: 'Adição de gps no banco do motorista', valor: 600,
             veiculo: new Veiculo({placa: 'LLA-8883', modelo: 'Celtinha humilde', cliente: new Cliente({
                nome: 'Gabriel',
                id: '06',
                cpf: '221018281' })
            })}),
            new Relatorio({descricaoServico: 'troca de obstrução obstreta de pneu furado', valor: 1250,
             veiculo: new Veiculo({placa: 'LBT-5521', modelo: 'Sandeiro', cliente: new Cliente({
                nome: 'Alberto Silva',
                id: '03',
                cpf: '11515515' })
            })}),
            new Relatorio({descricaoServico: 'Troca de óleo do motor', valor: 200,
             veiculo: new Veiculo({placa: 'BCT-9690', modelo: 'Fusca', cliente: new Cliente({
                nome: 'Fumagali Barreto',
                id: '04',
                cpf: '11515515' })
            })}),
            new Relatorio({descricaoServico: 'Colocar arcondicionado de anteiro', valor: 200,
             veiculo: new Veiculo({placa: 'BBL-9290', modelo: 'S10', cliente: new Cliente({
                nome: 'Carlos Alcantara',
                id: '05',
                cpf: '121241411' })
            })}),
            new Relatorio({descricaoServico: 'Adição de gps no banco do motorista', valor: 600,
             veiculo: new Veiculo({placa: 'LLA-8883', modelo: 'Celtinha humilde', cliente: new Cliente({
                nome: 'Gabriel',
                id: '06',
                cpf: '221018281' })
            })}),
        ]);
    }

    updateGestor(gestor: Gestor): Observable<any> {
        return this.http.put<Gestor>(encodeURI(this.urlApi + 'gestores/' + gestor.cpf), gestor)
        .pipe(
            map(response => {
                return response as Gestor;
            },
                error => this.handleError(error))
        );
        // Para testes sem back:
        // return of(gestor);
    }

    deleteGestor(cpf: string) {
        return this.http.delete<any>(encodeURI(this.urlApi + `gestores/${cpf}`), )
        .pipe(
            map(response => {
                return response;
            },
                error => this.handleError(error))
        );
    }
}
