import { Injectable } from '@angular/core';
import * as resourceData from '@assets/config/static-resources.json';

interface IResource {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private _resources: IResource = resourceData;// {};
  public get resources(): IResource {
    return this._resources;
  }

  public getResource(key: string): any | null {
    if (this._resources[key]) {
      return this._resources[key];
    }
  }

  public addResource(key: string, value: any): void {
    this._resources[key] = value;
  }
}
