import { Router } from '@angular/router';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let spectator: Spectator<ErrorComponent>;
  let router: Router;

  const createComponent = createComponentFactory({
    component: ErrorComponent,
    mocks: [Router],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();

    router = spectator.inject(Router);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should call the method after clicking the button', () => {
      jest.spyOn(spectator.component, 'onClick');

      const actionButton = spectator.query('[testId="navigate-button"]');

      if (actionButton) {
        spectator.click(actionButton);
      }

      expect(spectator.component.onClick).toHaveBeenCalled();
    });

    it('should call navigateByUrl in router with `home` after method has been triggered', () => {
      spectator.component.onClick();

      expect(router.navigateByUrl).toBeCalledTimes(1);
      expect(router.navigateByUrl).not.toBeCalledWith('someFakeUrl');
      expect(router.navigateByUrl).toBeCalledWith('home');
    });
  });
});
