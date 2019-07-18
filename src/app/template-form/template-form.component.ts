import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms/forms';

import 'rxjs/add/operator/map';

import { ConsultaCepService } from './../shared/services/consulta-cep.service';

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

  constructor(private http: HttpClient, private consultaCepService: ConsultaCepService) { }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
       'has-feedback': this.verificaValidTouched(campo),
    };
  }

  ngOnInit() {
  }

  onSubmit(formulario) {
    console.log(formulario);
    // console.log(this.usuario);
    // https://resttesttest.com/ para testes de rest
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .map(response => response)
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }

  consultaCEP(cep: string, form ) {
    this.consultaCepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados, form));
  }

  populaDadosForm(dados, formulario: NgForm) {

    /*

    // Força a atualização do objeto inteiro
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        numero: formulario.value.endereco.numero,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    console.log(formulario);

    */

    // Arremenda apenas os atributos informados
    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

}
