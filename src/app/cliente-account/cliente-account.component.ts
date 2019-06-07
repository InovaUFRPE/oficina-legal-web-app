import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cliente-account',
  templateUrl: './cliente-account.component.html',
  styleUrls: ['./cliente-account.component.scss']
})
export class ClienteAccountComponent implements OnInit {
  cliente: Cliente;
  myProfile = false;
  id: string;

  constructor(
    private readonly clienteService: ClienteService,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    if (this.localSaveService.getUsuarioLogado().id === this.id) {
      this.cliente = this.localSaveService.getUsuarioLogado() as Cliente;
      this.myProfile = true;
    } else {
      this.clienteService.getClienteById(this.id).subscribe({
        next: resp => {
        this.cliente = resp;
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
        }
      });
      // Para testes
      // this.cliente = new Cliente ({
      //   nome: 'Nícolas',
      //   id: '02',
      //   cpf: '11515515',
      //   usuario: this.localSaveService.getUsuarioLogado().usuario
      // });
    }
  }
  editarConta() {
    this.router.navigate([`/cliente/${this.id}/controlador`]);
  }
  deletarConta() {
    this.app.showLoading();
    this.clienteService.deleteCliente(this.cliente.cpf).subscribe({
      next: resp => {
      this.app.user = null;
      this.snotifyService.success('Conta deletada com sucesso', 'Sucesso!', this.app.getConfig());
      this.localSaveService.logOut();
      this.cliente = null;
      this.myProfile = false;
      this.router.navigate(['/']);
      },
      error: erro => {
        console.log(erro);
        this.app.hideLoading();
        this.snotifyService.error(erro.error.message, 'Atenção!', this.app.getConfig());
      }
    });
  }
}
