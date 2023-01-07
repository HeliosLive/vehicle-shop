import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let spectator: Spectator<ErrorComponent>;
  const createComponent = createComponentFactory({
    component: ErrorComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
