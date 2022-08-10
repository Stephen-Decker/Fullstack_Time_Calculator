import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ISettings } from './interfaces/ISettings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  settings: ISettings = { FullDayTime: 8 };

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.localStorageService.getLocalStorage()
      .pipe(map(data => {
        return data.Settings;
      }))
      .subscribe(data => {
        if (data) {
          this.settings = data;
        }
      });
  }

  onSaveClicked() {

  }

}
