import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Oficina } from 'src/app/shared/models/oficina.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { OficinaService } from 'src/app/shared/oficina.service';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-oficina-controller',
  templateUrl: './oficina-controller.component.html',
  styleUrls: ['./oficina-controller.component.scss']
})
export class OficinaControllerComponent implements OnInit {
  oficina: Oficina;
  oficinaForm: FormGroup;
  edit = false;

  constructor(
    private readonly oficinaService: OficinaService, private formBuilder: FormBuilder,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router) { }

  ngOnInit() {
    this.oficina = this.localSaveService.getOficinaToEdit();
    this.oficinaForm = this.formBuilder.group({
      razaoSocial: [ '', [Validators.required, Validators.maxLength(100)]],
      endereco: [ '', [Validators.required, Validators.maxLength(200)]],
      bairro: [ '', [Validators.required, Validators.maxLength(30)]],
      complemento: [ '', [Validators.maxLength(100)]]
    });

    if (this.oficina !== null) {
      this.oficinaForm.get('razaoSocial').setValue(this.oficina.razaoSocial);
      this.oficinaForm.get('endereco').setValue(this.oficina.endereco);
      this.oficinaForm.get('bairro').setValue(this.oficina.bairro);
      this.oficinaForm.get('complemento').setValue(this.oficina.complemento);
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  createOficina() {
    this.app.showLoading();
    const oficina = new Oficina({
      razaoSocial: this.oficinaForm.get('razaoSocial').value,
      endereco: this.oficinaForm.get('endereco').value,
      bairro: this.oficinaForm.get('bairro').value,
      complemento: this.oficinaForm.get('complemento').value ? this.oficinaForm.get('complemento').value : null
    });

    this.oficinaService.createOficina(oficina).subscribe({
      next: resp => {
        this.resetForm();
        this.app.hideLoading();
        this.snotifyService.success('Oficina criada com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  updateOficina() {
    this.app.showLoading();
    const oficina = new Oficina({
      razaoSocial: this.oficinaForm.get('razaoSocial').value,
      endereco: this.oficinaForm.get('endereco').value,
      bairro: this.oficinaForm.get('bairro').value,
      complemento: this.oficinaForm.get('complemento').value ? this.oficinaForm.get('complemento').value : null
    });

    this.oficinaService.updateOficina(oficina).subscribe({
      next: resp => {
        this.app.hideLoading();
        this.edit = false;
        this.localSaveService.setOficinaToEdit = resp;
        this.snotifyService.success('Oficina alterada com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  resetForm() {
    this.oficinaForm.get('razaoSocial').reset();
    this.oficinaForm.get('endereco').reset();
    this.oficinaForm.get('bairro').reset();
    this.oficinaForm.get('complemento').reset();
  }
}
