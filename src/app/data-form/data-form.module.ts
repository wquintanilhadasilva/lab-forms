import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { DataFormComponent } from './data-form.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [DataFormComponent]
})
export class DataFormModule { }
