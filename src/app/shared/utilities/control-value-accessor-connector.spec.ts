import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ControlValueAccessorConnector } from './control-value-accessor-connector';

describe('ControlValueAccessorConnector', () => {
  let spectator: Spectator<ControlValueAccessorConnector>;
  const createComponent = createComponentFactory({
    component: ControlValueAccessorConnector,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
