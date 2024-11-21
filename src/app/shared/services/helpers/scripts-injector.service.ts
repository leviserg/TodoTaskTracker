import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';

export type ScriptLoaderKey = 'src' | 'async' | 'type' | 'charset' | 'data-domain-script' | 'text';

@Injectable({
  providedIn: 'root'
})
export class ScriptInjectorService {
  private readonly r: Renderer2;
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly zone: NgZone,
    private readonly rendererFactory: RendererFactory2
  ) {
    this.r = rendererFactory.createRenderer(null, null);
  }

  public load(
    params: Map<ScriptLoaderKey, string>,
    injectPlace: 'head' | 'body' = 'body',
    innerHTML?: string | null
  ): Promise<void> {
    const scriptElement: HTMLScriptElement = this.r.createElement('script');

    for (let [key, value] of params.entries()) {
      if (key && value) {
        scriptElement.setAttribute(key, value);
      }
    }

    if (innerHTML) {
      scriptElement.innerHTML = innerHTML;
    }

    const promise = new Promise<void>((resolve, reject) => {
      scriptElement.addEventListener('load', () => {
        setTimeout(resolve, 10);
      });

      scriptElement.addEventListener('error', err => {
        reject(err);
      });
    });

    this.zone.runOutsideAngular(() => {
      switch (injectPlace) {
        case 'body':
          this.r.appendChild(this.document.body, scriptElement);
          break;
        case 'head':
          this.r.appendChild(this.document.head, scriptElement);
          break;
        default:
          this.r.appendChild(this.document.body, scriptElement);
      }
    });

    return promise;
  }
}
