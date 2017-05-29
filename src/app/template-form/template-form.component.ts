import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    endereco: null
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
    //console.log(this.usuario);
  }

}
