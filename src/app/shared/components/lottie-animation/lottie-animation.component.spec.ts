import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AnimationOptions } from 'ngx-lottie';

import { LottieAnimationComponent } from './lottie-animation.component';
import {
  animationGlobalOptions,
  getAnimationPath,
} from '@shared/animations/lottie-animation.options';

describe('LottieAnimationComponent', () => {
  const animationPath = 'car';
  const testId = 'text-test-id';

  let spectator: Spectator<LottieAnimationComponent>;
  const createComponent = createComponentFactory({
    component: LottieAnimationComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        animationPath,
        testId,
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should Host data-cy attr equals to testId input', () => {
    expect(spectator.element).toHaveAttribute('data-cy', testId);
  });

  it('should lottie element exist', () => {
    const lottie = spectator.query('ng-lottie');

    expect(lottie).toExist();
  });

  describe('animationOptions', () => {
    it('should animationOptions path equals to rendered animationPath input', () => {
      const animationOptions: AnimationOptions = {
        ...animationGlobalOptions,
        path: getAnimationPath(animationPath),
      };

      expect(spectator.component.animationOptions).toEqual(animationOptions);
    });
  });
});
