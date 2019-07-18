import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/dropdown.service';
import { ConsultaCepService } from './services/consulta-cep.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClient,
    ReactiveFormsModule
  ],
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClient,
    ReactiveFormsModule,
    CampoControlErroComponent,
    FormDebugComponent
  ],
  providers: [
    DropdownService, ConsultaCepService
  ]
})
export class SharedModule { }
