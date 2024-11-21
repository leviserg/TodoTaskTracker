import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 * Obtain the arguments' types of a function except the first argument
 */
type RestArgument<T> = T extends (first: any, ...args: infer Rest) => any ? Rest : never;

@Pipe({ name: 'applyMethod' })
export class ApplyMethodPipe implements PipeTransform {
  /**
   * @description
   * If you require access to component's property, please pass an arrow function instead of class method
   * usage > {{ someProperty | applyMethod: 'someMethodName' }}
   */
  public transform<FirstArgument, Function extends (first: FirstArgument, ...args: any[]) => any>(
    sourceValue: FirstArgument,
    methodName: Function,
    ...extra: RestArgument<Function>
  ): ReturnType<Function> {
    return methodName(sourceValue, ...extra);
  }
}
