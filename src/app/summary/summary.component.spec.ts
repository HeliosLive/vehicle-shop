import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { asapScheduler, scheduled } from 'rxjs';
import { MockComponent } from 'ng-mocks';

import { SummaryComponent } from './summary.component';

import type { Vehicle } from '@shared/models/vehicle.interface';
import { LabelComponent } from '@shared/components/label/label.component';
import { VehicleService } from '@shared/services/vehicle.service';
import { VEHICLE_DATA } from '@test/vehicle.data';

describe('SummaryComponent', () => {
  let spectator: Spectator<SummaryComponent>;
  let router: Router;
  let vehicleService: VehicleService;

  const { colors, ...rest } = VEHICLE_DATA[0];
  const selectedVehicle: Vehicle = { ...rest, color: colors[0] };

  const createComponent = createComponentFactory({
    component: SummaryComponent,
    declarations: [MockComponent(LabelComponent)],
    mocks: [Router, VehicleService],
    shallow: false,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();

    router = spectator.inject(Router);
    vehicleService = spectator.inject(VehicleService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should img visible if there is a data', fakeAsync(() => {
      vehicleService.selection$ = scheduled([selectedVehicle], asapScheduler);
      spectator.detectChanges();

      spectator.component.ngOnInit();

      tick();

      spectator.detectComponentChanges();

      const img = spectator.query('.info > img');

      expect(img).toExist();
      expect(img?.getAttribute('src')).toEqual(selectedVehicle.img);
    }));
  });

  describe('onClick', () => {
    it('should call the method after clicking the button if there is no data', () => {
      jest.spyOn(spectator.component, 'onClick');

      vehicleService.selection$ = scheduled([undefined], asapScheduler);
      spectator.detectComponentChanges();

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
