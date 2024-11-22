import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResourceService } from '@shared/services/resource.service';
import { IFooterRes } from '@shared/interfaces/resources/footer-res.interface';
import { StaticResourcesKeysEnum } from '@shared/enums/static-resources-keys.enum';
import { UtilsService } from '@shared/services/helpers/utils.service';
import { IInterpolateParams } from "@shared/pipes/interpolate-res-params.pipe";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter  } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  template: `
    <footer *ngIf="'' | applyMethod: getFooterRes as s">
      <div class="footer-container">
        <div class="overlay"></div>
        <div
          (click)="$event.stopPropagation()"
          [innerHTML]="(s.desc | interpolateResParams: interpolateParams) | safe: 'html'"
          class="footer-container-item"></div>
          <a routerLink="about">About</a>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent implements OnInit {

  public currentRoute: string = '';
  public showFooter: boolean = true;
  public readonly interpolateParams: IInterpolateParams;

  constructor(
    private readonly resourceService: ResourceService,
    private readonly utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.interpolateParams = {
      toReplace: ['{{currentYear}}'],
      values: [this.utilsService.getFullYear()]
    };
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      if(this.activatedRoute.root.firstChild){
        this.currentRoute = this.activatedRoute.root.firstChild.snapshot.url.map(segment => segment.path).join('/');
      }
      else{
        this.currentRoute = '';
      }
    });
  }

  public readonly getFooterRes = () => this.resourceService.getResource(StaticResourcesKeysEnum.FOOTER) as IFooterRes;

}
