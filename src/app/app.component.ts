import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Fullstack_Time_Culculator';
  developmentDayInHours: number = 6;

  timeInput: string = '';
  timeInputInHours: number = -1;

  outputTimeInHours: number = -1;
  invalidTimeInput: boolean = false;

  ngOnInit(): void {
  }

  constructor(
    private clipboardService: ClipboardService
  ) {
  }

  onEnterClicked() {
    this.doCuculation();
  }

  onInputBlur() {
    this.doCuculation();
  }

  onTextChange() {
    this.invalidTimeInput = false;
    if (!this.isValidInput(this.timeInput.trim())) {
      this.invalidTimeInput = true;
      return;
    }

    this.doCuculation();
  }

  private doCuculation() {
    this.outputTimeInHours = 0;

    if (this.invalidTimeInput) {
      return;
    }

    const inputText = this.timeInput.trim();
    this.sanitizeInput(inputText);
  }

  isValidInput(inputText: string) {
    if (!isNaN(+inputText)) {
      return true;
    }

    if (!this.getRegex(inputText)) {
      return false;
    }

    return true;
  }

  private getRegex(inputText: string) {
    // Must match the pattern '__d __h __m'
    const data = inputText.match(/^(\d+d)?\s*((?:[01]?\d|2[0-3])h)?\s*((?:[0-5]?\d)m)?$/);
    // Returns null if invalid
    return data;
  }

  private sanitizeInput(inputText: string) {
    let days = 0;
    let hours = 0;
    let minutes = 0;

    if (isNaN(+inputText)) {
      const regexArray = this.getRegex(inputText);
      if (regexArray && regexArray.length > 3) {
        days = (regexArray[1] ? +regexArray[1].toLocaleLowerCase().replace('d', '') : 0);
        hours = (regexArray[2] ? +regexArray[2].toLocaleLowerCase().replace('h', '') : 0);
        minutes = (regexArray[3] ? +regexArray[3].toLocaleLowerCase().replace('m', '') : 0);
      }
    } else {
      hours = +inputText;
    }

    hours += this.convertDaysToHours(days);
    hours += this.convertMinutesToHours(minutes);

    this.doMaltiplication(hours);
  }

  private convertDaysToHours(days: number): number {
    return (days * this.developmentDayInHours);
  }

  private convertMinutesToHours(minutes: number): number {
    return (minutes / 60);
  }

  private doMaltiplication(hours: number) {
    this.timeInputInHours = hours;

    const timeToRecord = ((hours / 3) * 4);

    // Make sure its rounded
    // timeToRecord = (Math.round((timeToRecord + Number.EPSILON) * 100) / 100);

    this.outputTimeInHours = timeToRecord;
  }


  onOutputTimeClicked() {
    this.clipboardService.copy(this.outputTimeInHours.toString());
  }
}
