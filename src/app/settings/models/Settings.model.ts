import { ISettings } from "../interfaces/ISettings.interface";

export class Settings implements ISettings {
  FullDayTime: number;

  constructor() {
    this.FullDayTime = 8;
  }
}
