import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

import type { ButtonColor } from './button.component';
import { ButtonComponent } from './button.component';

import type { LabelColor } from '@shared/components/label/label.component';
import { LabelComponent } from '@shared/components/label/label.component';

describe('Button', () => {
  describe('ButtonComponentHost', () => {
    let spectatorHost: SpectatorHost<ButtonComponent>;
    const createHost = createHostFactory({
      component: ButtonComponent,
      shallow: true,
    });

    describe('content projection', () => {
      it('should Host text content equals to content projection value', () => {
        const text = 'this is a crazy host test';
        spectatorHost = createHost(`<button hls-button>${text}</button>`);

        expect(spectatorHost.element.textContent).toEqual(text);
        expect(spectatorHost.element.textContent).not.toEqual(
          `incorrect${text}incorrect`
        );
      });
    });

    describe('selector', () => {
      it('should Host has the attr for passed selector', () => {
        spectatorHost = createHost(`<button hls-button-raised></button>`);

        expect(spectatorHost.element).toHaveAttribute('hls-button-raised');
      });

      it('should Host has the specific class for passed selector', () => {
        spectatorHost = createHost(`<button hls-button-raised></button>`);

        const elementClass =
          spectatorHost.element?.className.includes('hls-button-raised');

        expect(elementClass).toBe(true);
      });
    });

    describe('disabled', () => {
      it('should Host disabled attr does not exist if disabled input is not passed', () => {
        spectatorHost = createHost(`<button hls-button></button>`);

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]='false'></button>`
        );

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]='true'></button>`
        );

        expect(spectatorHost.element).toHaveAttribute('disabled', 'disabled');
      });

      it('should Host hls-button-disabled class exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]='true'></button>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-button-disabled'
        );

        expect(disabledClass).toBe(true);
      });

      it('should Host hls-button-disabled class does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]='false'></button>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-button-disabled'
        );

        expect(disabledClass).toBe(false);
      });
    });
  });

  describe('ButtonComponent', () => {
    const props = {
      color: 'primary' as ButtonColor,
      disabled: false,
      testId: 'button-test-id',
    };
    const labelColorMatch: Record<ButtonColor, LabelColor> = {
      primary: 'sun',
      secondary: 'info',
      danger: 'white',
    };

    let spectator: Spectator<ButtonComponent>;
    const createComponent = createComponentFactory({
      component: ButtonComponent,
      declarations: [MockComponent(LabelComponent)],
      shallow: true,
    });

    beforeEach(() => {
      spectator = createComponent({
        props,
      });
    });

    it('should create', () => {
      spectator.component.ngOnInit();
      expect(spectator.component).toBeTruthy();
    });

    it('should Host color attr equals to color input', () => {
      expect(spectator.element).toHaveAttribute('color', props.color);
    });

    it('should Host data-cy attr equals to testId input', () => {
      expect(spectator.element).toHaveAttribute('data-cy', props.testId);
    });

    describe('label', () => {
      for (let [key, value] of Object.entries(labelColorMatch)) {
        it(`should label color equals to ${value} when button type is ${key}`, () => {
          spectator.component.color = key as ButtonColor;
          spectator.detectChanges();
          spectator.detectComponentChanges();

          const label = spectator.query('hls-label', {
            read: LabelComponent,
          });

          expect(label?.color).toEqual(value);
        });
      }
    });

    describe('HostListener', () => {
      it('should call preventDefault from the triggering on MouseEvent', () => {
        const event = new MouseEvent('test');
        jest.spyOn(event, 'preventDefault');

        spectator.component.onPointerDownHandler(event);

        expect(event.preventDefault).toHaveBeenCalled();
      });
    });
  });
});
