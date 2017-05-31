import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms/forms';

import 'rxjs/add/operator/map';

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

  constructor(private http: Http) { }

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

  onSubmit(form) {
    console.log(form);
    // console.log(this.usuario);
    // https://resttesttest.com/ para testes de rest
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .map(response => response)
      .subscribe(dados => console.log(dados));
  }

  consultaCEP(cep: string, form ) {

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {

        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {

            // Consulta o webservice viacep.com.br/
            this.http.get(`//viacep.com.br/ws/${cep}/json/`)
              .map(dados => dados.json())
              .subscribe(dados => this.populaDadosForm(dados, form));
        }
    }

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
