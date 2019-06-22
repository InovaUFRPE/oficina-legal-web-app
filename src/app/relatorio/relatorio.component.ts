import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Gestor } from 'src/app/shared/models/gestor.model';
import { Relatorio } from 'src/app/shared/models/relatorio.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { AppComponent } from 'src/app/app.component';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { OficinaService } from 'src/app/shared/oficina.service';
import { Administrador } from '../shared/models/administrador.model';
import { RelatorioService } from '../shared/relatorio.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
  id: string;
  oficina: Oficina;
  gestor: Gestor;
  admin: Administrador;
  relatorios: Relatorio[];

  constructor(private readonly oficinaService: OficinaService,
    private readonly relatorioService: RelatorioService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router, private _location: Location,
    private readonly route: ActivatedRoute) { }



  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.localSaveService.getUsuarioLogado().usuario.tipo === '03') {
      this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
      this.oficina = this.gestor.Oficina; // oficina é do próprio gestor
      this.relatorioService.getRelatorioFinanceiro(this.oficina.id).subscribe({
        // busco os relatorios dessa oficina, precisa ser dentro do next pois é um metodo assinc e tem que ser executado em ordem
        next: retorno => {
          this.relatorios = retorno;
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
        }
      });
    } else {
      this.admin = this.localSaveService.getUsuarioLogado() as Administrador;
      this.oficinaService.getOficinaById(this.id).subscribe({
        next: resp => {
          this.oficina = resp; // busco a oficina pelo id da rota
          this.relatorioService.getRelatorioFinanceiro(this.oficina.id).subscribe({
            // busco os relatorios dessa oficina, precisa ser dentro do next pois é um metodo assinc e tem que ser executado em ordem
            next: retorno => {
              this.relatorios = retorno;
            },
            error: erro => {
              console.log(erro);
              this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
            }
          });
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
        }
      });
    }
  }
  voltar() {
    // this.router.navigate([`oficina/${this.oficina.id}/`]);
    this._location.back();
  }
}
