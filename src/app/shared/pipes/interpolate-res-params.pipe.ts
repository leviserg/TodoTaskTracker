import { Pipe, PipeTransform } from '@angular/core';

export interface IInterpolateParams {
  toReplace: string[];
  values: string[];
}

type InterpolateResBulk = Record<string, string>;

@Pipe({ name: 'interpolateResParams' })
export class InterpolateResParamsPipe implements PipeTransform {
  public transform(value: string, params: IInterpolateParams): string {
    if (!value || !params.toReplace.length || !params.values.length) {
      return value;
    }

    return this.replaceBulk(value, params.toReplace, params.values);
  }

  private replaceBulk(value: string, toReplace: string[], values: string[]): string {
    let regex: string[] = [];
    const map: InterpolateResBulk = {};

    toReplace.forEach((i, index) => {
      const val: string = i.replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1');
      regex = [...regex, val];
      map[i] = values[index];
    })

    return value.replace(new RegExp(regex.join('|'), 'g'), (matched) => map[matched]);
  }
}
