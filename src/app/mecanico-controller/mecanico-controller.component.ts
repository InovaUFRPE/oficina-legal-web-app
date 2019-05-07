import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Mecanico } from 'src/app/shared/models/mecanico.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { AppComponent } from 'src/app/app.component';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { OficinaService } from 'src/app/shared/oficina.service';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-mecanico-controller',
  templateUrl: './mecanico-controller.component.html',
  styleUrls: ['./mecanico-controller.component.scss']
})
export class MecanicoControllerComponent implements OnInit {
  oficinasList: Oficina[];
  mecanico: Mecanico;
  mecanicoForm: FormGroup;
  edit = false;

  constructor(private readonly oficinaService: OficinaService,
    private readonly mecanicoService: MecanicoService, private formBuilder: FormBuilder,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router) { }

  ngOnInit() {
    this.mecanico = this.localSaveService.getUsuarioLogado() as Mecanico;
    if (this.mecanico && !this.mecanico.oficina != null) {
      this.mecanico = null;
    }
    this.mecanicoForm = this.formBuilder.group({
      usuarioLogin: [ '', [Validators.required, Validators.maxLength(10)]],
      usuarioPassword: [ '', [Validators.required, Validators.maxLength(32)]],
      usuarioEmail: [ '', [Validators.required, Validators.email]],
      mecanicoNome: [ '', [Validators.required, Validators.maxLength(100)]],
      mecanicoCpf: [ '', [Validators.required, Validators.maxLength(100)]],
      mecanicoCurriculo: [ '', [Validators.required]],
      oficina: [ '', [Validators.maxLength(100)]]
    });

    this.oficinaService.getOficinas()
      .subscribe({
      next: resp => {
        this.oficinasList = resp;
        const toSelect = this.oficinasList
          .find(c => this.mecanico && this.mecanico.oficina ? c.idOficina === this.mecanico.oficina.idOficina : null);
        this.mecanicoForm.get('oficina').setValue(toSelect);
      },
      error: erro => {
        console.log(erro);
        this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
      }
    });

    if (this.mecanico !== null) {
      this.mecanicoForm.get('usuarioLogin').setValue(this.mecanico.usuario.login);
      this.mecanicoForm.get('usuarioPassword').setValue(this.mecanico.usuario.senha);
      this.mecanicoForm.get('usuarioEmail').setValue(this.mecanico.usuario.email);
      this.mecanicoForm.get('mecanicoNome').setValue(this.mecanico.nome);
      this.mecanicoForm.get('mecanicoCpf').setValue(this.mecanico.cpf);
      this.mecanicoForm.get('mecanicoCurriculo').setValue(this.mecanico.cpf);
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  createMecanico() {
    this.app.showLoading();
    const usuario = new Usuario({
      login: this.mecanicoForm.get('usuarioLogin').value,
      senha: this.mecanicoForm.get('usuarioPassword').value,
      email: this.mecanicoForm.get('usuarioEmail').value,
      tipo: '02'
    });
    const mecanico = new Mecanico({
      usuario,
      nome: this.mecanicoForm.get('mecanicoNome').value,
      cpf: this.mecanicoForm.get('mecanicoCpf').value,
      curriculo: this.mecanicoForm.get('mecanicoCurriculo').value,
      oficina: this.mecanicoForm.get('oficina').value ? this.mecanicoForm.get('oficina').value : null
    });

    this.mecanicoService.createMecanico(mecanico).subscribe({
      next: resp => {
        this.resetForm();
        this.app.hideLoading();
        this.snotifyService.success('Mecanico criado com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  updateMecanico() {
    this.app.showLoading();
    const usuario = new Usuario({
      login: this.mecanicoForm.get('usuarioLogin').value,
      senha: this.mecanicoForm.get('usuarioPassword').value,
      email: this.mecanicoForm.get('usuarioEmail').value,
      tipo: '02'
    });
    const mecanico = new Mecanico({
      usuario,
      nome: this.mecanicoForm.get('mecanicoNome').value,
      cpf: this.mecanicoForm.get('mecanicoCpf').value,
      curriculo: this.mecanicoForm.get('mecanicoCurriculo').value,
      oficina: this.mecanicoForm.get('oficina').value ? this.mecanicoForm.get('oficina').value : null
    });

    this.mecanicoService.updateMecanico(mecanico).subscribe({
      next: resp => {
        this.app.hideLoading();
        this.app.login(resp);
        this.mecanico = resp;
        this.snotifyService.success('Mecanico alterado com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  resetForm() {
    this.mecanicoForm.get('usuarioLogin').reset();
    this.mecanicoForm.get('usuarioPassword').reset();
    this.mecanicoForm.get('usuarioEmail').reset();
    this.mecanicoForm.get('mecanicoNome').reset();
    this.mecanicoForm.get('mecanicoCpf').reset();
    this.mecanicoForm.get('oficina').reset();
  }
}
