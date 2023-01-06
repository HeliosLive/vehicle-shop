import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Observable, of } from 'rxjs';

import { AppComponent } from './app.component';

import { ThemeService } from '@shared/services/theme.service';
import { height, width } from '@shared/helpers/window-event';

jest.mock('@shared/helpers/window-event', () => ({
  ...jest.requireActual('@shared/helpers/window-event'),
  height: jest.fn(),
  width: jest.fn(),
}));

const mockHeight = height as jest.Mock<Observable<number>>;
const mockWidth = width as jest.Mock<Observable<number>>;

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let themeService: ThemeService;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [ThemeService],
    detectChanges: false,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();

    themeService = spectator.inject(ThemeService);

    themeService.initialize = jest.fn();
    themeService.listen = jest.fn();
    mockHeight.mockReturnValue(of(600));
    mockWidth.mockReturnValue(of(300));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call theme service methods for setting the theme', () => {
    jest.spyOn(themeService, 'initialize');
    jest.spyOn(themeService, 'listen');

    spectator.component.ngOnInit();

    expect(themeService.initialize).toHaveBeenCalled();
    expect(themeService.listen).toHaveBeenCalled();
  });
});
