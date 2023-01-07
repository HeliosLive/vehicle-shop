import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';

import type { Color } from '@shared/models/color.type';

describe('Select', () => {
  describe('SelectComponentHost', () => {
    let spectatorHost: SpectatorHost<SelectComponent>;
    const createHost = createHostFactory({
      component: SelectComponent,
      declarations: [MockComponent(OptionComponent)],
      shallow: true,
    });

    describe('content projection', () => {
      it('should Host element content equals to content projection value', () => {
        const element = '<option>value</option>';
        spectatorHost = createHost(`<select hls-select>${element}</select>`);

        expect(spectatorHost.element.innerHTML).toContain(element);
      });
    });

    describe('ngAfterContentInit', () => {
      it('should ContentChildren elements have the same color as the input value', () => {
        const color: Color = 'primary';
        const element = '<option hls-option>value</option>';
        spectatorHost = createHost(
          `<select hls-select color=${color}>${element}</select>`
        );
        const option = spectatorHost.query('option', {
          read: OptionComponent,
        });

        spectatorHost.component.ngAfterContentInit();

        expect(option?.color).toEqual(color);
      });
    });

    describe('disabled', () => {
      it('should Host disabled attr does not exist if disabled input is not passed', () => {
        spectatorHost = createHost(`<select hls-select></select>`);

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<select hls-select [disabled]='false'></select>`
        );

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<select hls-select [disabled]='true'></select>`
        );

        expect(spectatorHost.element).toHaveAttribute('disabled', 'disabled');
      });

      it('should Host hls-select-disabled class exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<select hls-select [disabled]='true'></select>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-select-disabled'
        );

        expect(disabledClass).toBe(true);
      });

      it('should Host hls-select-disabled class does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<select hls-select [disabled]='false'></select>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-select-disabled'
        );

        expect(disabledClass).toBe(false);
      });
    });
  });

  describe('SelectComponent', () => {
    const props = {
      color: 'primary' as Color,
      disabled: false,
      testId: 'select-test-id',
    };

    let spectator: Spectator<SelectComponent>;
    const createComponent = createComponentFactory({
      component: SelectComponent,
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
