import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { simplifiedText } from '@shared/constants/other.constants';

type AnyObject = Record<string, any>;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /**
   * @description
   * Control utils
   */
  public isBoolean = (val: any): boolean => typeof val === 'boolean';
  public isString = (value: any): boolean => typeof value === 'string';
  public isNumber = (value: any): boolean => typeof value === 'number';
  public isNumberFinite = (value: any) => this.isNumber(value) && isFinite(value);
  public isUndefined = (value: any): boolean => typeof value === 'undefined';
  public isNull = (value: any): boolean => value === null;
  public isNullOrUndefined = (value: any): boolean => this.isNull(value) || this.isUndefined(value);
  public isEmptyStr = (value?: string | null): boolean =>
    this.isNullOrUndefined(value) || !value?.length || this.hasOnlySpacesSpace(value);
  public hasOnlySpacesSpace = (value: string): boolean => value.trim().length === 0;
  public isObject = (value: any): boolean => value !== null && typeof value === 'object';
  public isArray = (value: any): boolean => value !== null && value instanceof Array && Array.isArray(value);
  public toNumber = (value: string): number => Number(value);
  public toString = (value: number): string => String(value);
  public extractDeepPropertyByMapKey = (obj: any, map: string): any => {
    const keys = map.split('.');
    const head = keys.shift();

    return keys.reduce((prop: any, key: string) => {
      return !this.isUndefined(prop) && !this.isNull(prop) && !this.isUndefined(prop[key]) ? prop[key] : null;
    }, obj[head || '']);
  };
  public extractDeepPropertyByParentMapKey = (obj: any, map: string): any => {
    const keys = map.split('.');
    const tail = keys.pop();
    const props = this.extractDeepPropertyByMapKey(obj, keys.join('.'));

    return { props, tail };
  };
  public isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * @description
   * Array utils
   */
  public chunkArray = (arr: any[], size: number): any[][] =>
    arr.length > size ? [arr.slice(0, size), ...this.chunkArray(arr.slice(size), size)] : [arr];
  public removeAtFromArray = (arr: any[], index: number): any[] => arr.splice(index, 1);
  public flattenArraySimplified = (arr: any[]): any[] =>
    arr.reduce((a, b) => a.concat(Array.isArray(b) ? this.flattenArraySimplified(b) : b), []);
  public flattenArray = <T>(arr: T[], key: string): T[] => {
    let children: T[] = [];
    return arr
      .map(mem => {
        const m = { ...mem };
        const entity = this.getEntityKeyValue(m, key);
        if (entity && this.isArray(entity) && entity.length) {
          children = [...children, ...entity];
        }
        delete m[key as keyof T];
        return m;
      })
      .concat(children.length ? this.flattenArray(children, key) : children);
  };
  public uniqArr = (arr: any[]): any[] => [...new Map(arr.map(item => [item, item])).values()];
  public getArrFromNumbersRange = (start: number, end: number, step = 1): number[] => {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len)
      .fill(start)
      .map((_, idx) => start + idx * step);
  };

  /**
   * @description
   * Object utils
   */
  public deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
  public shallowCopy = <T>(instance = {}, obj: T): T => Object.assign(instance, obj);
  public toStringify = <T>(obj: T): string => JSON.stringify(obj);
  public cacheStringify = <T>(obj: T): string => {
    let cache: any[] = [];
    let str = JSON.stringify(obj, function (_, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
      return value;
    });

    cache = [];
    return str;
  };
  public hasOwnProperty = <T>(obj: T, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);
  public isEmptyObject = (object: Record<any, any>): boolean => Object.keys(object).length === 0 && object.constructor === Object;
  public compareWith = (o1: any, o2: any): any => (o1 && o2 ? o1.id === o2.id : o1 === o2);
  public toLowerCaseObjectKeys(object: AnyObject): AnyObject {
    const isArray = Array.isArray;
    const toLowerCaseFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

    function convertKeys(obj: AnyObject): AnyObject {
      if (typeof obj !== 'object') {
        return obj;
      }
      const result: AnyObject = {};
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          const newKey = toLowerCaseFirstLetter(key);
          result[newKey] =
            typeof value === 'object' && value !== null ? (isArray(value) ? value.map(convertKeys) : convertKeys(value)) : value;
        }
      }
      return result;
    }

    return convertKeys(object);
  }
  public getEntityKeyValue = <T>(entity: T, key: string): any => entity[key as keyof T];
  public isEntityKeyValueAvailable = <T>(entity: T, key: string): any => Boolean(entity[key as keyof T]);

  /**
   * @description
   * Text utils
   */
  public sentenceCase = (str?: string | null): string | null => {
    if (str === undefined || str === null || str === '') {
      return null;
    }
    if (str) {
      return str.toString().replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    } else {
      return null;
    }
  };
  public simplifiedText = (str: string): string => simplifiedText(str);
  public getFullName = (firstName: string, lastName: string): string => `${firstName}, ${lastName}`;
  public removeAfterCharacter = (char: string, txt?: string): string | null => (txt ? txt.split(char)[0] : null);
  public toLowerCaseFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1);

  public checkIsHasPlaceholder(str: string): boolean {
    return /\{\{([^}]+)\}\}/g.test(str);
  }
  public replacePlaceholders(str: string, values: Record<string, string>): string {
    return str.replace(/\{\{([^}]+)\}\}/g, (match: string, placeholder): string => {
      const value: string = values[placeholder.trim()];
      return value !== undefined ? value : match;
    });
  }
  public getFileExtension = (fileName: string): string | undefined => fileName.split('.').pop();

  /**
   * @description
   * Math utils
   */
  public getRandomInt = (min: number = 1, max: number = 999): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  public getRandomId = (): number => Date.now();

  /**
   * @description
   * Files
   */
  public getMergedBuffer(buffers: ArrayBuffer[]): ArrayBuffer {
    const result = new Uint8Array(buffers.reduce((totalSize, buf) => totalSize + buf.byteLength, 0));
    buffers.reduce((offset, buf) => {
      result.set(buf as any, offset);
      return offset + buf.byteLength;
    }, 0);
    return result.buffer;
  }

  public readBlobAsArrayBuffer(blob: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      let arrayBuffer: string | ArrayBuffer | null;
      const fileReader = new FileReader();
      fileReader.onload = event => {
        if (event?.target) {
          arrayBuffer = event.target.result;
        }
      };
      fileReader.onloadend = () => resolve(fileReader.result);
      fileReader.onerror = err => reject(err);
      fileReader.readAsArrayBuffer(blob);
    });
  }

  /**
   * @description
   * Date utils
   */
  public getCurrentDate = (): string => formatDate(new Date(), 'MM_dd_yyyy', 'en-US');
  public getFullYear = (): string => new Date().getFullYear().toString();
  public convertUtcToLocalDateTime = (date: string): string => {
    const utcDate = new Date(date);
    return `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString()}`;
  };

}
