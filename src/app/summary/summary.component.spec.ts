import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let spectator: Spectator<SummaryComponent>;
  const createComponent = createComponentFactory({
    component: SummaryComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
