import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
  tap,
} from 'rxjs';

import { TimeoutGlobal } from '@shared/models/timeout-global.enum';

export function height(): Observable<number> {
  return fromEvent(window.visualViewport ?? window, 'resize').pipe(
    startWith({
      target: {
        height: window.visualViewport?.height ?? window.innerHeight,
      },
    }),
    debounceTime(TimeoutGlobal.WindowResizeDebounceTime),
    pluck('target', 'height'),
    distinctUntilChanged(),
    map((value) => Number(value)),
    tap((value: number) => {
      document.documentElement.style.setProperty('--vh', `${value * 0.01}px`);
    })
  );
}

export function width(): Observable<number> {
  return fromEvent(window.visualViewport ?? window, 'resize').pipe(
    startWith({
      target: {
        width: window.visualViewport?.width ?? window.innerWidth,
      },
    }),
    debounceTime(TimeoutGlobal.WindowResizeDebounceTime),
    pluck('target', 'width'),
    distinctUntilChanged(),
    map((value) => Number(value)),
    tap((value: number) => {
      document.documentElement.style.setProperty('--vw', `${value * 0.01}px`);
    })
  );
}
