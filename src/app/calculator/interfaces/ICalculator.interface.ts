import { ISettings } from "src/app/settings/interfaces/ISettings.interface";

export interface ICalculator {
  Settings: ISettings;
  TimeInHours: number;
  OutputTimeInHours: number;
  InvalidInput: boolean;
}
