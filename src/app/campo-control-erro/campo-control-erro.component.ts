import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css']
})
export class CampoControlErroComponent implements OnInit {

  @Input() exibir: boolean;
  @Input() mensagemDeErro: string;
  @Input() target: string;

  constructor() { }

  ngOnInit() {
    if (this.target !== '') {
      this.target = 'campo';
    }
  }

}
