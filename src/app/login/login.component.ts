import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Usuario } from '../shared/models/usuario.model';
import { LocalSaveService } from '../shared/local-save.service';

export interface Tipos {
  valor: string;
  nome: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: Boolean;

  constructor(private readonly loginService: LoginService, private formBuilder: FormBuilder, private snotifyService: SnotifyService,
    private app: AppComponent, private router: Router, private readonly authenticationService: LocalSaveService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        login: ['', [Validators.required, Validators.minLength(6)]],
        senha: ['', [Validators.required, Validators.minLength(6)]]
      });
    this.hide = true;
}
  loginUser() {
    const those = this;
    this.app.showLoading();
    const user: Usuario = new Usuario({
      senha : this.loginForm.get('senha').value
    });

    const login: string = this.loginForm.get('login').value;
    if (login.includes('.com')) {
      user.email = login;
    } else {
      user.login = login;
    }

    this.loginService.loginUsuario(user).subscribe({
      next: resp => {
      those.authenticationService.setToken(resp.token);
      those.loginService.getUsuarioCompleto(resp.user.id).subscribe({
          next: respo => {
            if (respo.Oficina) {
              respo.usuario.tipo =  '03';
            } else {
              respo.usuario.tipo =  '04';
            }
            those.authenticationService.setUsuarioLogado(respo);
            this.app.user = respo;
            those.snotifyService.success('Login efetuado com sucesso', 'Sucesso!', this.app.getConfig());
            those.router.navigate([`/home`]);
          },
          error: erro => {
            console.log(erro);
            this.app.hideLoading();
            those.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
          }
      });
      },
      error: erro => {
        console.log(erro);
        this.app.hideLoading();
        those.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
      }
    });

  }
}
