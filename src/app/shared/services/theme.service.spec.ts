import { fakeAsync, tick } from '@angular/core/testing';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ThemeService } from './theme.service';

import type { Theme } from '@shared/models/theme.type';

describe('ThemeService', () => {
  let spectator: SpectatorService<ThemeService>;
  const mockWindow = {
    matchMedia: jest.fn((_v: string) => {}),
  };

  const createService = createServiceFactory({
    service: ThemeService,
    providers: [{ provide: window, useValue: mockWindow }],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should set the light theme if schema does not match', () => {
      matchMediaDefineProperty(false);

      spectator.service.initialize();

      expect(getThemeAttribute()).toBe('light');
    });

    it('should set the dark theme if schema matches', () => {
      matchMediaDefineProperty(true);

      spectator.service.initialize();

      expect(getThemeAttribute()).toBe('dark');
    });

    it('should set the subject with correct value', fakeAsync(() => {
      matchMediaDefineProperty(true);

      spectator.service.initialize();

      spectator.service.data$.subscribe((value: Theme) => {
        expect(value).not.toBe('light');
        expect(value).toBe('dark');
      });
      tick();
    }));
  });

  function getThemeAttribute() {
    return document.documentElement.getAttribute('data-theme');
  }

  function matchMediaDefineProperty(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  }
});
