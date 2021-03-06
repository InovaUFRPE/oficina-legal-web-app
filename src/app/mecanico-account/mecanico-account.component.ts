import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Mecanico } from 'src/app/shared/models/mecanico.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-mecanico-account',
  templateUrl: './mecanico-account.component.html',
  styleUrls: ['./mecanico-account.component.scss']
})
export class MecanicoAccountComponent implements OnInit {
  mecanico: Mecanico;
  myProfile = false;
  id: string;

  constructor(
    private readonly mecanicoService: MecanicoService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.mecanicoService.getMecanicoById(this.id).subscribe({
      next: resp => {
      this.mecanico = resp;
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
      }
    });

  }
  editarConta() {
    this.router.navigate([`/mecanico/${this.id}/controlador`]);
  }
  deletarConta() {
    this.app.showLoading();
    this.mecanicoService.deleteMecanico(this.mecanico.cpf).subscribe({
      next: resp => {
      this.app.user = null;
      this.snotifyService.success('Conta deletada com sucesso', 'Sucesso!', this.app.getConfig());
      this.localSaveService.logOut();
      this.mecanico = null;
      this.myProfile = false;
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
    this._location.back();
  }
}
