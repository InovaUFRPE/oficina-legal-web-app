import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { OficinaService } from 'src/app/shared/oficina.service';
import { AppComponent, GenericQueryParams } from 'src/app/app.component';
import { Gestor } from '../shared/models/gestor.model';
import { Administrador } from '../shared/models/administrador.model';
import { Agendamento } from '../shared/models/agendamento.model';
import { FormControl } from '@angular/forms';

export interface Tipos {
  valor: string;
  nome: string;
}
@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.scss']
})
export class OficinaComponent implements OnInit {
  oficina: Oficina;
  gestor: Gestor;
  admin: Administrador;
  agendamentos: Agendamento[];
  id: string;
  tiposList: Tipos[] = [];
  control = new FormControl('');


  constructor(
    private readonly oficinaService: OficinaService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.tiposList.push({valor: 'data', nome: 'Data'}, {valor: 'cliente', nome: 'Cliente'}, {valor: 'modelo', nome: 'Modelo'});

    if (this.localSaveService.getUsuarioLogado().tipo === '03') {
      this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
      this.oficina = this.gestor.oficina;
    } else {
      this.admin = this.localSaveService.getUsuarioLogado() as Administrador;
      this.oficinaService.getOficinaById(this.id).subscribe({
        next: resp => {
          this.oficina = resp;
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.message, 'Atenção!', this.app.getConfig());
        }
      });
    }
    this.oficinaService.getAgendamentosById(this.id).subscribe({
      next: resp => {
        this.agendamentos = resp;
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.message, 'Atenção!', this.app.getConfig());
      }
    });
    this.control.valueChanges
    .subscribe(value => {
      this.oficinaService.getAgendamentosById(this.id, {q: value.valor} as GenericQueryParams).subscribe({
        next: resp => {
          this.agendamentos = resp;
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.message, 'Atenção!', this.app.getConfig());
        }
      });
    });
  }

  deletarOficina() {
    this.app.showLoading();
    this.oficinaService.deleteOficina(this.oficina.idOficina).subscribe({
      next: resp => {
      this.app.user.oficina = null;
      this.snotifyService.success('Oficina deletada com sucesso', 'Sucesso!', this.app.getConfig());
      this.router.navigate(['/']);
      },
      error: erro => {
        console.log(erro);
        this.app.hideLoading();
        this.snotifyService.error(erro.message, 'Atenção!', this.app.getConfig());
      }
    });
  }
}
