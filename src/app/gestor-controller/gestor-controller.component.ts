import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Gestor } from 'src/app/shared/models/gestor.model';
import { Relatorio } from 'src/app/shared/models/relatorio.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { GestorService } from 'src/app/shared/gestor.service';
import { AppComponent } from 'src/app/app.component';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { OficinaService } from 'src/app/shared/oficina.service';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-gestor-controller',
  templateUrl: './gestor-controller.component.html',
  styleUrls: ['./gestor-controller.component.scss']
})
export class GestorControllerComponent implements OnInit {


  constructor(private readonly oficinaService: OficinaService,
    private readonly gestorService: GestorService, private formBuilder: FormBuilder,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router) { }
  oficinasList: Oficina[];
  mes1: null;
  getProducts = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  gestor: Gestor;
  relatorioForm: FormGroup;
  edit = false;
  relatorios: any[];
  printar = function() {

    let mes = this.relatorioForm.get('tipoUsuario').value;

    if (mes === '' ) {
      mes = 'null';
    }





  };

  ngOnInit() {
    this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
    console.log(this.localSaveService.getUsuarioLogado());
    this.relatorioForm = this.formBuilder.group({
        tipoUsuario: ['', [Validators.required, Validators.minLength(100)]]


    });
    this.gestorService.getRelatorioFinanceiro().subscribe({
      next: resp => {
        console.log(resp);
        this.relatorios = resp;
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
      }
    });



   

  }



  resetForm() {
    this.relatorioForm.get('usuarioLogin').reset();
    this.relatorioForm.get('usuarioPassword').reset();
    this.relatorioForm.get('usuarioEmail').reset();
    this.relatorioForm.get('gestorNome').reset();
    this.relatorioForm.get('gestorCpf').reset();
    this.relatorioForm.get('oficina').reset();
  }

}
