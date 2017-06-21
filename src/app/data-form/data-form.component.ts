import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Http } from '@angular/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  resposta: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http
  ) { }

  ngOnInit() {

    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .map(response => response)
      .subscribe(dados => {
        console.log(dados);
        this.resetar();
        this.resposta = dados;
      });

  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
       'has-feedback': this.verificaValidTouched(campo),
    };
  }

  verificaValidTouched(campo) {
    return this.verificaInValid(campo) && this.verificaTouched(campo);
  }

  verificaTouched(campo) {
    return this.formulario.get(campo).touched && !this.formulario.get(campo).value;
  }

 verificaInValid(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

}
