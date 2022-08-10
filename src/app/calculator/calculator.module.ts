import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CalculatorRoutingModule
  ]
})
export class CalculatorModule { }
