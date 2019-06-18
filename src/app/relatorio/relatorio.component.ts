import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Gestor } from 'src/app/shared/models/gestor.model';
import { Relatorio } from 'src/app/shared/models/relatorio.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { GestorService } from 'src/app/shared/gestor.service';
import { AppComponent } from 'src/app/app.component';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { OficinaService } from 'src/app/shared/oficina.service';
import { Usuario } from '../shared/models/usuario.model';
import { Administrador } from '../shared/models/administrador.model';
import { RelatorioService } from '../shared/relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
  id: string;
  oficina: Oficina;
  mes1: null;

  getProducts = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  gestor: Gestor;
  admin: Administrador;
  relatorioForm: FormGroup;
  relatorios: any[];

  constructor(private readonly oficinaService: OficinaService,
    private readonly relatorioService: RelatorioService, private formBuilder: FormBuilder,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute) { }



  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.localSaveService.getUsuarioLogado().usuario.tipo === '03') {
      this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
      this.oficina = this.gestor.Oficina; // oficina é do próprio gestor
    } else {
      this.admin = this.localSaveService.getUsuarioLogado() as Administrador;
      this.oficinaService.getOficinaById(this.id).subscribe({
        next: resp => {
          this.oficina = resp; // busco a oficina pelo id da rota
          this.relatorioService.getRelatorioFinanceiro(this.oficina.id).subscribe({
            // busco os relatorios dessa oficina, precisa ser dentro do next pois é um metodo assinc e tem que ser executado em ordem
            next: retorno => {
              console.log(retorno);
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
    this.relatorioForm = this.formBuilder.group({
      tipoUsuario: ['', [Validators.required, Validators.minLength(100)]]
    });
    console.log(this.localSaveService.getUsuarioLogado());
  }

  printar() {
    let mes = this.relatorioForm.get('tipoUsuario').value;
    if (mes === '' ) {
      mes = 'null';
    }
  }

  resetForm() {
    this.relatorioForm.get('usuarioLogin').reset();
    this.relatorioForm.get('usuarioPassword').reset();
    this.relatorioForm.get('usuarioEmail').reset();
    this.relatorioForm.get('gestorNome').reset();
    this.relatorioForm.get('gestorCpf').reset();
    this.relatorioForm.get('oficina').reset();
  }
  
  voltar() {
    this.router.navigate([`oficina/${this.oficina.id}/`]);
  }

}
