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
import {Location} from '@angular/common';


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
    private readonly route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.tiposList.push({valor: 'data', nome: 'Data'}, {valor: 'cliente', nome: 'Cliente'}, {valor: 'modelo', nome: 'Modelo'});

    if (this.localSaveService.getUsuarioLogado().usuario.tipo === '03') {
      this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
      this.oficina = this.gestor.Oficina;
    } else {
      this.admin = this.localSaveService.getUsuarioLogado() as Administrador;
      this.oficinaService.getOficinaById(this.id).subscribe({
        next: resp => {
          this.oficina = resp;
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
        }
      });
    }
    this.oficinaService.getAgendamentosById(this.id).subscribe({
      next: resp => {
        console.log(resp);
        this.agendamentos = resp;
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
      }
    });
    this.control.valueChanges
    .subscribe(value => {
      this.oficinaService.getAgendamentosById(this.id, value ? {q: value.valor} as GenericQueryParams : null).subscribe({
        next: resp => {
          this.agendamentos = resp;
        },
        error: erro => {
          console.log(erro);
          this.agendamentos = [];
          this.snotifyService.error(erro.alert, 'Atenção!', this.app.getConfig());
        }
      });
    });
  }

  deletarOficina() {
    this.app.showLoading();
    this.oficinaService.deleteOficina(this.oficina.id).subscribe({
      next: resp => {
      this.app.user.oficina = null;
      this.snotifyService.success('Oficina deletada com sucesso', 'Sucesso!', this.app.getConfig());
      this.router.navigate(['/']);
      },
      error: erro => {
        console.log(erro);
        this.app.hideLoading();
        this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
      }
    });
  }
  voltar() {
    // if (this.gestor) {
    //     this.router.navigate(['/']);
    //  } else if (this.admin) {
    //     this.router.navigate(['/lista-oficina']);
    //  }
    this._location.back();
  }
}
