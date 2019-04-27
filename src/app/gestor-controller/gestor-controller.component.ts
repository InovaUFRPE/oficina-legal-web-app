import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Gestor } from 'src/app/shared/models/gestor.model';
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
  oficinasList: Oficina[];
  gestor: Gestor;
  gestorForm: FormGroup;
  edit = false;

  constructor(private readonly oficinaService: OficinaService,
    private readonly gestorService: GestorService, private formBuilder: FormBuilder,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router) { }

  ngOnInit() {
    this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
    this.gestorForm = this.formBuilder.group({
      usuarioLogin: [ '', [Validators.required, Validators.maxLength(10)]],
      usuarioPassword: [ '', [Validators.required, Validators.maxLength(32)]],
      usuarioEmail: [ '', [Validators.required, Validators.email]],
      gestorNome: [ '', [Validators.required, Validators.maxLength(100)]],
      gestorCpf: [ '', [Validators.required, Validators.maxLength(100)]],
      oficina: [ '', [Validators.maxLength(100)]]
    });

    this.oficinaService.getOficinas()
      .subscribe({
      next: resp => {
        this.oficinasList = resp;
        const toSelect = this.oficinasList
          .find(c => this.gestor && this.gestor.oficina ? c.idOficina === this.gestor.oficina.idOficina : null);
        this.gestorForm.get('oficina').setValue(toSelect);
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
      }
    });

    if (this.gestor !== null) {
      this.gestorForm.get('usuarioLogin').setValue(this.gestor.usuario.login);
      this.gestorForm.get('usuarioPassword').setValue(this.gestor.usuario.senha);
      this.gestorForm.get('usuarioEmail').setValue(this.gestor.usuario.email);
      this.gestorForm.get('gestorNome').setValue(this.gestor.nome);
      this.gestorForm.get('gestorCpf').setValue(this.gestor.cpf);
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  createGestor() {
    this.app.showLoading();
    const usuario = new Usuario({
      login: this.gestorForm.get('usuarioLogin').value,
      senha: this.gestorForm.get('usuarioPassword').value,
      email: this.gestorForm.get('usuarioEmail').value
    });
    const gestor = new Gestor({
      usuario,
      nome: this.gestorForm.get('gestorNome').value,
      cpf: this.gestorForm.get('gestorCpf').value,
      oficina: this.gestorForm.get('oficina').value ? this.gestorForm.get('oficina').value : null
    });

    this.gestorService.createGestor(gestor).subscribe({
      next: resp => {
        this.resetForm();
        this.app.hideLoading();
        this.snotifyService.success('Gestor criado com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  updateGestor() {
    this.app.showLoading();
    const usuario = new Usuario({
      login: this.gestorForm.get('usuarioLogin').value,
      senha: this.gestorForm.get('usuarioPassword').value,
      email: this.gestorForm.get('usuarioEmail').value
    });
    const gestor = new Gestor({
      usuario,
      nome: this.gestorForm.get('gestorNome').value,
      cpf: this.gestorForm.get('gestorCpf').value,
      oficina: this.gestorForm.get('oficina').value ? this.gestorForm.get('oficina').value : null
    });

    this.gestorService.updateGestor(gestor).subscribe({
      next: resp => {
        this.app.hideLoading();
        this.app.login(resp);
        this.gestor = resp;
        this.snotifyService.success('Gestor alterado com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  resetForm() {
    this.gestorForm.get('usuarioLogin').reset();
    this.gestorForm.get('usuarioPassword').reset();
    this.gestorForm.get('usuarioEmail').reset();
    this.gestorForm.get('gestorNome').reset();
    this.gestorForm.get('gestorCpf').reset();
    this.gestorForm.get('oficina').reset();
  }
}
