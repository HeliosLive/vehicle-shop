import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { asapScheduler, scheduled } from 'rxjs';
import { MockComponent } from 'ng-mocks';

import { HomeComponent } from './home.component';

import type { Vehicle } from '@shared/models/vehicle.interface';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LabelComponent } from '@shared/components/label/label.component';
import { LottieAnimationComponent } from '@shared/components/lottie-animation/lottie-animation.component';
import { VehicleService } from '@shared/services/vehicle.service';
import { VehicleHttpService } from '@shared/services/vehicle-http.service';
import { VEHICLE_DATA } from '@test/vehicle.data';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  let router: Router;
  let vehicleHttpService: VehicleHttpService;
  let vehicleService: VehicleService;

  const httpFakeData = VEHICLE_DATA;
  const { type, brand, colors } = httpFakeData[0];
  const formValue: Vehicle = { type, brand, color: colors[0] };

  const createComponent = createComponentFactory({
    component: HomeComponent,
    declarations: [
      MockComponent(ButtonComponent),
      MockComponent(LabelComponent),
      MockComponent(LottieAnimationComponent),
    ],
    imports: [ReactiveFormsModule],
    mocks: [Router, VehicleHttpService, VehicleService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    shallow: false,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();

    router = spectator.inject(Router);
    vehicleHttpService = spectator.inject(VehicleHttpService);
    vehicleService = spectator.inject(VehicleService);

    vehicleHttpService.get = jest.fn(() =>
      scheduled([httpFakeData], asapScheduler)
    );
    vehicleService.set = jest.fn();
    vehicleService.filter = jest.fn();
    vehicleService.select = jest.fn();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call the set method when constructor initialized', fakeAsync(() => {
      jest.spyOn(vehicleService, 'set');

      spectator.component.ngOnInit();

      tick();

      expect(vehicleService.set).toHaveBeenCalled();
      expect(vehicleService.set).toHaveBeenCalledWith(httpFakeData);
    }));
  });

  describe('ngAfterViewInit', () => {
    it('should lottery number be undefined before initialized', () => {
      expect(spectator.component.lotteryNumber).toBeUndefined();
    });

    it('should lottery number can not be undefined after initialized', fakeAsync(() => {
      spectator.component.ngAfterViewInit();

      tick();

      spectator.component.ngOnDestroy();

      expect(spectator.component.lotteryNumber).not.toBeUndefined();

      flush();
    }));
  });

  describe('onSubmit', () => {
    it('should call the select method in vehicleService with the form value & redirect afterwards', fakeAsync(() => {
      spectator.component.ngOnInit();
      spectator.component.vehicleForm.patchValue(formValue);

      tick();

      jest.spyOn(vehicleService, 'select');

      spectator.component.onSubmit();

      expect(vehicleService.select).toHaveBeenCalled();
      expect(vehicleService.select).toHaveBeenCalledWith(formValue);

      expect(router.navigateByUrl).toBeCalledTimes(1);
      expect(router.navigateByUrl).not.toBeCalledWith('someFakeUrl');
      expect(router.navigateByUrl).toBeCalledWith('summary');
    }));
  });

  describe('onReset', () => {
    it('should call the reset method in the form', () => {
      spectator.component.vehicleForm.patchValue(formValue);

      expect(spectator.component.vehicleForm.value).toEqual(formValue);

      spectator.component.onReset();

      const expectation = Object.keys(formValue).reduce((accumulator, key) => {
        return { ...accumulator, [key]: null };
      }, {});

      expect(spectator.component.vehicleForm.value).toEqual(expectation);
    });
  });
});
