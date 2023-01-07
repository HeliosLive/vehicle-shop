import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator/jest';

import { OptionComponent } from './option.component';

import type { Color } from '@shared/models/color.type';

describe('Option', () => {
  describe('OptionComponentHost', () => {
    let spectatorHost: SpectatorHost<OptionComponent>;
    const createHost = createHostFactory({
      component: OptionComponent,
      shallow: true,
    });

    describe('content projection', () => {
      it('should Host text content equals to content projection value', () => {
        const text = 'this is a crazy host test';
        spectatorHost = createHost(`<option hls-option>${text}</option>`);

        expect(spectatorHost.element.textContent).toEqual(text);
        expect(spectatorHost.element.textContent).not.toEqual(
          `incorrect${text}incorrect`
        );
      });
    });

    describe('disabled', () => {
      it('should Host disabled attr does not exist if disabled input is not passed', () => {
        spectatorHost = createHost(`<option hls-option></option>`);

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<option hls-option [disabled]='false'></option>`
        );

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<option hls-option [disabled]='true'></option>`
        );

        expect(spectatorHost.element).toHaveAttribute('disabled', 'disabled');
      });

      it('should Host hls-option-disabled class exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<option hls-option [disabled]='true'></option>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-option-disabled'
        );

        expect(disabledClass).toBe(true);
      });

      it('should Host hls-option-disabled class does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<option hls-option [disabled]='false'></option>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-option-disabled'
        );

        expect(disabledClass).toBe(false);
      });
    });
  });

  describe('OptionComponent', () => {
    const props = {
      color: 'primary' as Color,
      disabled: false,
      testId: 'option-test-id',
    };

    let spectator: Spectator<OptionComponent>;
    const createComponent = createComponentFactory({
      component: OptionComponent,
      shallow: true,
    });

    beforeEach(() => {
      spectator = createComponent({
        props,
      });
    });

    it('should Host color attr equals to color input', () => {
      expect(spectator.element).toHaveAttribute('color', props.color);
    });

    it('should Host data-cy attr equals to testId input', () => {
      expect(spectator.element).toHaveAttribute('data-cy', props.testId);
    });
  });
});
