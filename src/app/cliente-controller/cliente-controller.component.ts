import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-cliente-controller',
  templateUrl: './cliente-controller.component.html',
  styleUrls: ['./cliente-controller.component.scss']
})
export class ClienteControllerComponent implements OnInit {
  cliente: Cliente;
  clienteForm: FormGroup;
  edit = false;

  constructor(
    private readonly clienteService: ClienteService, private formBuilder: FormBuilder,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router) { }

  ngOnInit() {
    this.cliente = this.localSaveService.getClienteToEdit();
    this.clienteForm = this.formBuilder.group({
      usuarioLogin: [ '', [Validators.required, Validators.maxLength(10)]],
      usuarioPassword: [ '', [Validators.required, Validators.maxLength(32)]],
      usuarioEmail: [ '', [Validators.required, Validators.maxLength(100)]],
      clienteNome: [ '', [Validators.required, Validators.maxLength(100)]],
      clienteCpf: [ '', [Validators.required, Validators.maxLength(100)]],
      clienteBairro: [ '', [Validators.maxLength(30)]],
      clienteCep: [ '', [Validators.required, Validators.maxLength(8)]],
      clienteEndereco: [ '', [Validators.required, Validators.maxLength(200)]],
      clienteComplemento: [ '', [Validators.maxLength(100)]]
    });

    if (this.cliente !== null) {
      this.clienteForm.get('usuarioLogin').setValue(this.cliente.usuario.login);
      this.clienteForm.get('usuarioPassword').setValue(this.cliente.usuario.senha);
      this.clienteForm.get('usuarioEmail').setValue(this.cliente.usuario.email);
      this.clienteForm.get('clienteNome').setValue(this.cliente.nome);
      this.clienteForm.get('clienteCpf').setValue(this.cliente.cpf);
      this.clienteForm.get('clienteBairro').setValue(this.cliente.bairro);
      this.clienteForm.get('clienteCep').setValue(this.cliente.cep);
      this.clienteForm.get('clienteEndereco').setValue(this.cliente.endereco);
      this.clienteForm.get('clienteComplemento').setValue(this.cliente.complemento);
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  createCliente() {
    this.app.showLoading();
    const usuario = new Usuario({
      login: this.clienteForm.get('usuarioLogin').value,
      senha: this.clienteForm.get('usuarioPassword').value,
      email: this.clienteForm.get('usuarioEmail').value,
    });
    const cliente = new Cliente({
      usuario: usuario,
      nome: this.clienteForm.get('clienteNome').value,
      cpf: this.clienteForm.get('clienteCpf').value,
      bairro: this.clienteForm.get('clienteBairro').value ? this.clienteForm.get('clienteBairro').value : null,
      cep: this.clienteForm.get('clienteCep').value,
      endereco: this.clienteForm.get('clienteEndereco').value,
      complemento: this.clienteForm.get('clienteComplemento').value ? this.clienteForm.get('clienteComplemento').value : null
    });
    this.clienteService.createCliente(cliente).subscribe({
      next: resp => {
        this.resetForm();
        this.app.hideLoading();
        this.snotifyService.success('Cadastro realizado com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  updateCliente() {
    this.app.showLoading();
    const usuario = new Usuario({
      login: this.clienteForm.get('usuarioLogin').value,
      senha: this.clienteForm.get('usuarioPassword').value,
      email: this.clienteForm.get('usuarioEmail').value,
    });
    const cliente = new Cliente({
      usuario: usuario,
      nome: this.clienteForm.get('clienteNome').value,
      cpf: this.clienteForm.get('clienteCpf').value,
      bairro: this.clienteForm.get('clienteBairro').value ? this.clienteForm.get('clienteBairro').value : null,
      cep: this.clienteForm.get('clienteCep').value,
      endereco: this.clienteForm.get('clienteEndereco').value,
      complemento: this.clienteForm.get('clienteComplemento').value ? this.clienteForm.get('clienteComplemento').value : null
    });
    this.clienteService.updateCliente(cliente).subscribe({
      next: resp => {
        this.app.hideLoading();
        this.edit = false;
        this.localSaveService.clean();
        this.snotifyService.success('Perfil alterado com Sucesso', 'Sucesso!', this.app.getConfig());
        },
        error: erro => {
          console.log(erro);
          this.app.hideLoading();
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
    });
  }

  resetForm() {
    this.clienteForm.get('usuarioLogin').reset();
    this.clienteForm.get('usuarioPassword').reset();
    this.clienteForm.get('usuarioEmail').reset();
    this.clienteForm.get('clienteNome').reset();
    this.clienteForm.get('clienteCpf').reset();
    this.clienteForm.get('clienteBairro').reset();
    this.clienteForm.get('clienteCep').reset();
    this.clienteForm.get('clienteEndereco').reset();
    this.clienteForm.get('clienteComplemento').reset();
  }
}
