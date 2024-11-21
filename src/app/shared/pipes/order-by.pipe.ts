import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '@shared/services/helpers/utils.service';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  private static extractFromConfig(config: any) {
    const sign = config.substr(0, 1);
    const prop = config.replace(/^[-+]/, '');
    const asc = sign !== '-';

    return [prop, asc, sign];
  }

  constructor(private readonly utilsService: UtilsService) { }

  transform<T>(input: T, config?: any): T;
  transform(input: any[], config?: any): any[];

  transform(input: any, config?: any): any {
    if (!Array.isArray(input)) {
      return input;
    }

    const out = [...input];

    // sort by multiple properties
    if (Array.isArray(config)) {
      return out.sort((a, b) => {
        const l = config.length;
        for (let i = 0; i < l; ++i) {
          const [prop, asc] = OrderByPipe.extractFromConfig(config[i]);
          const pos = this.orderCompare(prop, asc, a, b);
          if (pos !== 0) {
            return pos;
          }
        }

        return 0;
      });
    }

    // sort by a single property value
    if (this.utilsService.isString(config)) {
      const [prop, asc, sign] = OrderByPipe.extractFromConfig(config);

      if (config.length === 1) {
        // tslint:disable-next-line:switch-default
        switch (sign) {
          case '+':
            return out.sort(this.simpleSort.bind(this));
          case '-':
            return out.sort(this.simpleSort.bind(this)).reverse();
        }
      }

      return out.sort(this.orderCompare.bind(this, prop, asc));
    }

    // default sort by value
    return out.sort(this.simpleSort.bind(this));
  }

  private simpleSort(a: any, b: any) {
    return this.utilsService.isString(a) && this.utilsService.isString(b)
      ? a.toLowerCase().localeCompare(b.toLowerCase())
      : a - b;
  }

  private orderCompare(prop: string, asc: boolean, a: any, b: any) {
    const first = this.utilsService.extractDeepPropertyByMapKey(a, prop);
    const second = this.utilsService.extractDeepPropertyByMapKey(b, prop);

    if (first === second) {
      return 0;
    }

    if (
      this.utilsService.isUndefined(first) ||
      this.utilsService.isNull(first) ||
      first === ''
    ) {
      return 1;
    }

    if (
      this.utilsService.isUndefined(second) ||
      this.utilsService.isNull(first) ||
      second === ''
    ) {
      return -1;
    }

    if (
      this.utilsService.isString(first) &&
      this.utilsService.isString(second)
    ) {
      const pos = first.toLowerCase().localeCompare(second.toLowerCase());

      return asc ? pos : -pos;
    }

    return asc ? first - second : second - first;
  }
}
