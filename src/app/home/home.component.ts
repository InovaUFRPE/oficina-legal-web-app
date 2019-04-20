import { Component, OnInit } from '@angular/core';
import { LocalSaveService } from '../shared/local-save.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localSaveService: LocalSaveService) { }

  ngOnInit() {
    this.localSaveService.clean();
  }

}
