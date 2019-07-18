import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { TemplateFormComponent } from './template-form.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TemplateFormComponent
  ]
})
export class TemplateFormModule { }
