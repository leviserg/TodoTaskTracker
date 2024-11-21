import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { animationFrameScheduler, interval, Observable, share } from 'rxjs';
import { map } from 'rxjs/operators';

export const WINDOW = new InjectionToken<Window>(
  'Window object (either global window or mock window)',
  {
    providedIn: 'root',
    factory: () => (inject(PLATFORM_ID) === 'browser' ? window : ({} as Window))
  }
);

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.localStorage object',
  {
    factory: () => inject(WINDOW).localStorage
  }
);

export const NAVIGATOR = new InjectionToken<Navigator>(
  'An abstraction over window.navigator object',
  {
    factory: () => inject(WINDOW).navigator
  }
);

export const ANIMATION_FRAME = new InjectionToken<
  Observable<DOMHighResTimeStamp>
>('Shared Observable based on `window.requestAnimationFrame`', {
  factory: () => {
    const performanceRef = inject(Performance);
    return interval(0, animationFrameScheduler).pipe(
      map(() => performanceRef.now()),
      share()
    );
  }
});

/*
export const SIGNALR_TOKEN: InjectionToken<string> = new InjectionToken(
  'signalr'
);
*/
