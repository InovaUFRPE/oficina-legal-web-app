import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { OficinaService } from 'src/app/shared/oficina.service';
import { AppComponent } from 'src/app/app.component';
import { Gestor } from '../shared/models/gestor.model';
import { Administrador } from '../shared/models/administrador.model';
import { Agendamento } from '../shared/models/agendamento.model';

@Component({
  selector: 'app-lista-oficina',
  templateUrl: './lista-oficina.component.html',
  styleUrls: ['./lista-oficina.component.scss']
})
export class ListaOficinaComponent implements OnInit {
  listaOficina: Oficina[];
  admin: Administrador;

  constructor(
    private readonly oficinaService: OficinaService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.admin = this.localSaveService.getUsuarioLogado() as Administrador;
    this.oficinaService.getListaOficina().subscribe({
      next: resp => {
        this.listaOficina = resp;
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.message, 'Atenção!', this.app.getConfig());
      }
    });
  }
  verOficina(oficina: Oficina) {
    this.router.navigate([`/oficina/${oficina.idOficina}`]);
  }
}
