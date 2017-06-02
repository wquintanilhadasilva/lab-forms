import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent
  ],
  exports: [
    CampoControlErroComponent,
    FormDebugComponent
  ]
})
export class SharedModule { }
