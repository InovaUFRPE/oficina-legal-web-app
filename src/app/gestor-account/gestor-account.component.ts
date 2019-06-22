import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { Gestor } from 'src/app/shared/models/gestor.model';
import { LocalSaveService } from 'src/app/shared/local-save.service';
import { GestorService } from 'src/app/shared/gestor.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-gestor-account',
  templateUrl: './gestor-account.component.html',
  styleUrls: ['./gestor-account.component.scss']
})
export class GestorAccountComponent implements OnInit {
  // selectedFile: File = null;
  gestor: Gestor;
  myProfile = false;
  id: string;

  constructor(
    private readonly gestorService: GestorService,
    // private http: HttpClient,
    private snotifyService: SnotifyService, private localSaveService: LocalSaveService,
    private app: AppComponent, private router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.localSaveService.getUsuarioLogado().id === this.id) {
      this.gestor = this.localSaveService.getUsuarioLogado() as Gestor;
      this.myProfile = true;
    } else {
      this.gestorService.getGestorById(this.id).subscribe({
        next: resp => {
        this.gestor = resp;
        },
        error: erro => {
          console.log(erro);
          this.snotifyService.error(erro.error.alert, 'Atenção!', this.app.getConfig());
        }
      });
    }
  }
  editarConta() {
    this.router.navigate([`/gestor/${this.id}/controlador`]);
  }

  deletarConta() {
    this.app.showLoading();
    this.gestorService.deleteGestor(this.gestor.cpf).subscribe({
      next: resp => {
      this.app.user = null;
      this.snotifyService.success('Conta deletada com sucesso', 'Sucesso!', this.app.getConfig());
      this.localSaveService.logOut();
      this.gestor = null;
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
}
