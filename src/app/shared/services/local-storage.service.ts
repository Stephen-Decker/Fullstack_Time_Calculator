import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ILocalStorageData } from './interfaces/ILocalStorageData.interface';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable()
export class LocalStorageService {

  private _localStorage: { Key: string, Storage: Storage } = {} as { Key: string, Storage: Storage };
  private _data: ILocalStorageData = {} as ILocalStorageData;

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage.Storage = _localStorageRefService.localStorage;
  }

  setLocalStorage(data: ILocalStorageData): void {
    const jsonData = JSON.stringify(data);
    this._localStorage.Storage.setItem(this._localStorage.Key, jsonData);
  }

  getLocalStorage(): Observable<ILocalStorageData> {
    const storage = this._localStorage.Storage.getItem(this._localStorage.Key);

    if (!storage) {
      return of({} as ILocalStorageData);
    }

    const data: ILocalStorageData = JSON.parse(storage);
    return of(data);
  }

  clearLocalStorageSettings() {
    this._localStorage.Storage.removeItem(this._localStorage.Key);
  }

  clearAllLocalStorage(): void {
    this._localStorage.Storage.clear();
  }
}
