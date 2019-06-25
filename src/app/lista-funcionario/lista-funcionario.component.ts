import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { AppComponent } from 'src/app/app.component';
import { Gestor } from '../shared/models/gestor.model';
import { Administrador } from '../shared/models/administrador.model';
import { Mecanico } from '../shared/models/mecanico.model';
import { OficinaService } from '../shared/oficina.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.scss']
})
export class ListaFuncionarioComponent implements OnInit {
  listaFuncionarios: Mecanico[];
  admin: Administrador;
  mecanicos: Mecanico[];
  gestor: Gestor;
  oficina: Oficina;
  id: string;

  constructor(
    private readonly mecanicoService: MecanicoService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router, private _location: Location,
    private readonly route: ActivatedRoute, private readonly oficinaService: OficinaService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
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
    this.mecanicoService.getMecanicosByOficina(this.route.snapshot.params.id).subscribe({
      next: resp => {
        this.listaFuncionarios = resp;
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
      }
    });
  }

  verFuncionario(funcionario: Mecanico) {
    this.router.navigate([`/mecanico/${funcionario.id}`]);
  }
  voltar() {
    this.router.navigate([`oficina/${this.oficina.id}/`]);
    // this._location.back();
  }
}
