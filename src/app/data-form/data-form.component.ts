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
      email: new FormControl(null),
      endereco: new FormGroup({
        cep: new FormControl(null)
      })
    });*/
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
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

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep').value;

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
          .subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  resetaDadosForm(formulario) {
    // Arremenda apenas os atributos informados
    this.formulario.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  populaDadosForm(dados) {
    // Arremenda apenas os atributos informados
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    this.formulario.get('nome').setValue('Wedson'); //Outra forma de fazer campo a campo
  }
}
