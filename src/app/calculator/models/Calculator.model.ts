import { ISettings } from "src/app/settings/interfaces/ISettings.interface";
import { Settings } from "src/app/settings/models/Settings.model";
import { ICalculator } from "../interfaces/ICalculator.interface";

export class Calculator implements ICalculator {

  Settings: ISettings;
  TimeInHours: number;
  OutputTimeInHours: number;
  InvalidInput: boolean;

  constructor(settings?: ISettings) {
    this.Settings = settings ? settings : new Settings();
    this.TimeInHours = -1;
    this.InvalidInput = false;
    this.OutputTimeInHours = -1;
  }

  IsValidInput(inputText: string): boolean {
    if (!isNaN(+inputText)) {
      return true;
    }

    if (!this.getRegex(inputText)) {
      return false;
    }

    return true;
  }

  DoCuculation(inputText: string): void {

    if (this.InvalidInput) {
      return;
    }

    const hours = this.getHoursFromInput(inputText.trim());
    this.OutputTimeInHours = this.doMaltiplication(hours);
  }

  private doMaltiplication(hours: number): number {
    this.TimeInHours = hours;

    const timeToRecord = ((hours / 3) * 4);

    // Make sure its rounded
    // timeToRecord = (Math.round((timeToRecord + Number.EPSILON) * 100) / 100);

    return timeToRecord;
  }

  private getRegex(inputText: string) {
    // Must match the pattern '__d __h __m'
    const data = inputText.match(/^(\d+d)?\s*((?:[01]?\d|2[0-3])h)?\s*((?:[0-5]?\d)m)?$/);
    // Returns null if invalid
    return data;
  }

  private getHoursFromInput(inputText: string): number {
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

    return hours;
  }

  private convertDaysToHours(days: number): number {
    return (days * this.Settings.FullDayTime);
  }

  private convertMinutesToHours(minutes: number): number {
    return (minutes / 60);
  }
}
