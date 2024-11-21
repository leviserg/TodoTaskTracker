import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceService } from '@shared/services/resource.service';
import { IFooterRes } from '@shared/interfaces/resources/footer-res.interface';
import { StaticResourcesKeysEnum } from '@shared/enums/static-resources-keys.enum';
import { UtilsService } from '@shared/services/helpers/utils.service';
import { IInterpolateParams } from "@shared/pipes/interpolate-res-params.pipe";

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
export class FooterComponent {

  public readonly interpolateParams: IInterpolateParams;

  constructor(
    private readonly resourceService: ResourceService,
    private readonly utilsService: UtilsService
  ) {
    this.interpolateParams = {
      toReplace: ['{{currentYear}}'],
      values: [this.utilsService.getFullYear()]
    };
  }

  public readonly getFooterRes = () => this.resourceService.getResource(StaticResourcesKeysEnum.FOOTER) as IFooterRes;

}
