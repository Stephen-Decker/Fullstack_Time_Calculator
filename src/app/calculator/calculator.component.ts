import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Calculator } from './models/Calculator.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  _calculator: Calculator = new Calculator();

  timeInput: string = '';

  constructor(
    private clipboardService: ClipboardService
  ) {
  }

  ngOnInit(): void {
    this._calculator.OutputTimeInHours = -1;
  }

  doCuculation() {
    this._calculator.DoCuculation(this.timeInput);
  }

  onEnterClicked() {
    this.doCuculation();
  }

  onInputBlur() {
    this.doCuculation();
  }

  onTextChange() {
    this._calculator.InvalidInput = false;
    if (!this._calculator.IsValidInput(this.timeInput.trim())) {
      this._calculator.InvalidInput = true;
      return;
    }

    this.doCuculation();
  }

  onOutputTimeClicked() {
    this.clipboardService.copy(this._calculator.OutputTimeInHours.toString());
  }
}
