import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE_CONFIG } from './local-storage-config';
import { LOCAL_STORAGE } from '@shared/constants/injections.constants';

interface IStorage {
  value: any;
  expiresIn: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly localStorage: Storage = inject(LOCAL_STORAGE);
  constructor() {
    this._setResetKey();
  }

  private get ourStorage(): Storage {
    return this.localStorage;
  }

  private _setResetKey(): void {
    const _key = LocalStorageService.getKey(LOCAL_STORAGE_CONFIG.Storage.ResetKey);
    const _reset: any = this.ourStorage.getItem(_key);

    if (!_reset || _reset !== 'true') {
      this.clear();
      this.ourStorage.setItem(_key, 'true');
    }
  }

  private static getKey(key: string, withLanguage = false): string {
    return `${LOCAL_STORAGE_CONFIG.Storage.Key}${withLanguage ? '.' + LOCAL_STORAGE_CONFIG.Basic.language : ''}.${key}`;
  }

  private setItem(
    key: string,
    value: any,
    expiresIn: number = LOCAL_STORAGE_CONFIG.Storage.Timeout,
    withLanguage = false
  ) {
    const _value: IStorage = {
      value,
      timestamp: Date.now(),
      expiresIn: expiresIn
    };

    this.ourStorage.setItem(LocalStorageService.getKey(key, withLanguage), JSON.stringify(_value));
  }

  private getItem(key: string, withLanguage = false): any {
    const _key = LocalStorageService.getKey(key, withLanguage);
    const value: any = this.ourStorage.getItem(_key);

    if (!value) {
      return null;
    }
    const _value: IStorage = JSON.parse(value);

    if (Date.now() - _value.timestamp > _value.expiresIn * 3_600_000) {
      this.ourStorage.removeItem(_key);
      return null;
    }
    return _value.value;
  }

  private removeItem(key: string, withLanguage = false) {
    this.ourStorage.removeItem(LocalStorageService.getKey(key, withLanguage));
  }

  public setCache(key: string, value: any, expiresIn: number = LOCAL_STORAGE_CONFIG.Storage.Timeout) {
    this.setItem(key, value, expiresIn, true);
  }

  public getCache(key: string): any {
    return this.getItem(key, true);
  }

  public getOrigin(key: string): any {
    const value = this.ourStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  public removeCache(key: string) {
    this.removeItem(key, true);
  }

  public clear(): void {
    const toClear = [];

    for (let i = 0; i < this.ourStorage.length; i++) {
      const name = this.ourStorage.key(i);
      if (name?.indexOf(LOCAL_STORAGE_CONFIG.Storage.Key) === 0) {
        toClear.push(name);
      }
    }

    toClear.forEach(n => this.ourStorage.removeItem(n));
  }
}
