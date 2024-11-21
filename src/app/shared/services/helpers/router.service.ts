import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private readonly router: Router) { }

  public async reloadCurrentRoute(): Promise<void> {
    const url = this.router.url;
    const sameUrlStrategy = this.router.onSameUrlNavigation;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    await this.router.navigateByUrl(url);

    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) =>
      future.routeConfig === curr.routeConfig;
    this.router.onSameUrlNavigation = sameUrlStrategy;
  }
}
