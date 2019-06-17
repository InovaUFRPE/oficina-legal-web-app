import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { AppComponent, GenericQueryParams } from 'src/app/app.component';
import { Gestor } from '../shared/models/gestor.model';
import { Administrador } from '../shared/models/administrador.model';
import { Agendamento } from '../shared/models/agendamento.model';
import { Tipos } from '../login/login.component';
import { FormControl } from '@angular/forms';
import { Mecanico } from '../shared/models/mecanico.model';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.scss']
})
export class ListaFuncionarioComponent implements OnInit {
  listaFuncionarios: Mecanico[];
  admin: Administrador;
  tiposList: Tipos[] = [];
  control = new FormControl('');
  mecanicos: Mecanico[];

  constructor(
    private readonly mecanicoService: MecanicoService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.admin = this.localSaveService.getUsuarioLogado() as Administrador;
    this.tiposList.push({ valor: 'endereco', nome: 'Endereço' }, { valor: 'razao', nome: 'Nome da Oficina' });
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
}
