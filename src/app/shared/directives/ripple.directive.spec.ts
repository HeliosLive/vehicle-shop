import {
  createDirectiveFactory,
  SpectatorDirective,
} from '@ngneat/spectator/jest';

import type { RippleColor, RippleSpeed } from './ripple.directive';
import { RippleDirective } from './ripple.directive';

describe('Directive: RippleDirective', () => {
  let spectator: SpectatorDirective<RippleDirective>;
  let rippleColor: RippleColor = 'light';
  let rippleSpeed: RippleSpeed = 'normal';

  const createDirective = createDirectiveFactory({
    directive: RippleDirective,
    template: `<input hlsRipple rippleSpeed="${rippleSpeed}" rippleColor="${rippleColor}">`,
  });

  beforeEach(() => {
    spectator = createDirective();
  });

  it('should create an instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  it('should host has ripple container class', () => {
    expect(spectator.element).toHaveClass('ripple-container');
    expect(spectator.element).not.toHaveClass('ripple-container-fake');
  });

  describe('onClick', () => {
    beforeEach(() => {
      jest.spyOn(spectator.directive, 'onClick');

      spectator.click(spectator.element);
    });

    it('should method itself called after click', () => {
      expect(spectator.directive.onClick).toHaveBeenCalled();
    });

    it('should host includes the element that has ripple class itself after click', () => {
      const ripple = spectator.element.querySelector('.ripple');

      expect(ripple).toExist();
    });

    it('should host includes the element that has ripple color class after click', () => {
      const color = spectator.element.querySelector(`.${rippleColor}`);

      expect(color).toExist();
    });

    it('should host includes the element that has ripple speed class after click', () => {
      const speed = spectator.element.querySelector(`.${rippleSpeed}`);

      expect(speed).toExist();
    });

    it('should remove old ripple element after multiple clicks', () => {
      spectator.click(spectator.element);
      const ripple = spectator.element.querySelectorAll('.ripple');

      expect(ripple.length).toBeLessThan(2);
    });
  });
});
