import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES_HOME } from '@shared/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _history: string[] = [];

  public get history(): string[] {
    return this._history;
  }

  public get locationInstance(): Location {
    return this.location;
  }

  constructor(private readonly router: Router, private readonly location: Location) { }

  public setHistory(urlAfterRedirects: string): void {
    this._history = [...this._history, urlAfterRedirects];
  }

  public goBack(): void {
    this.history.pop();

    if (this.history.length > 0) {
      this.location.back();
    } else {
      void this.router.navigateByUrl(ROUTES_HOME);
    }
  }

  public getPreviousUrl(): string {
    if (this.history.length > 0) {
      return this.history[this.history.length - 2];
    }

    return ROUTES_HOME;
  }

  public replaceState(path: string, query?: string, state?: any): void {
    this.location.replaceState(path, query, state);
  }
}
