import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Mecanico } from './models/mecanico.model';
import { AppComponent } from '../app.component';
import { Usuario } from './models/usuario.model';
import { Oficina } from './models/oficina.model';



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
    return this.http.get<Mecanico[]>(this.urlApi + 'mecanico', {
      headers: this.headers
    }).pipe(
      map(response => {
        return response as Mecanico[];
      },
        error => this.handleError(error))
    );
  }

  getMecanicosByOficina(idOficina: number): Observable<Mecanico[]> {
    return this.http.get<any[]>(`${this.urlApi}mecanicooficina/findByOficina/${idOficina}` , {
      headers: this.headers
    }).pipe(
      map(response => {
        const retorno = [];
        response.forEach(objeto => {
          objeto.Mecanico.cpf = objeto.Mecanico.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
          retorno.push(new Mecanico({
            id: objeto.Mecanico.id,
            curriculo: objeto.Mecanico.curriculo,
            nome: objeto.Mecanico.nome,
            cpf: objeto.Mecanico.cpf,
            usuario: objeto.Mecanico.usuario,
            idOficina: objeto.idOficina
          }));
        });
        return retorno as Mecanico[];
      },
        error => this.handleError(error))
    );
  }

    getMecanicoById(id: string): Observable<Mecanico> {
        return this.http.get<any>(this.urlApi + 'mecanico/' + id, {
            headers: this.headers
        }).pipe(
                map(response => {
                    response.cpf = response.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
                    return response as Mecanico;
                },
                    error => this.handleError(error))
            );
    }

  createMecanico(mecanico: Mecanico): Observable<any> {
    return this.http.post<Mecanico>(this.urlApi + 'mecanico', mecanico, {
      headers: this.headers
    }).pipe(
      map(response => {
        return response as Mecanico;
      },
        error => this.handleError(error))
    );
  }
  updateMecanico(mecanico: Mecanico): Observable<any> {
    // return this.http.put<Mecanico>(encodeURI(this.urlApi + 'mecanico/' + mecanico.cpf), mecanico, {
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
    return this.http.delete<any>(encodeURI(this.urlApi + `mecanico/${cpf}`), {
      headers: this.headers
    }).pipe(
      map(response => {
        return response;
      },
        error => this.handleError(error))
    );
  }
}
