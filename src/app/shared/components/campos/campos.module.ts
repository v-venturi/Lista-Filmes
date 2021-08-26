import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ValidarCamposService } from './validar-campos.service';



@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent, 
    InputTextareaComponent,
    InputSelectComponent],

  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,  
  ],
  exports: [
     InputTextComponent,
     InputNumberComponent,
     InputDateComponent, 
     InputTextareaComponent,
     InputSelectComponent,
  ]
})
export class CamposModule { }
