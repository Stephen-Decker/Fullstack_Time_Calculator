import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageRefService {

  getLocalStorage(): Storage {
    return localStorage;
  }

  get localStorage(): Storage {
    return this.getLocalStorage();
  }
}
