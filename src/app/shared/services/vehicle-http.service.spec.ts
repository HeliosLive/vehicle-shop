import { HttpClient } from '@angular/common/http';

import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator/jest';
import { asapScheduler, scheduled } from 'rxjs';

import { VehicleHttpService } from './vehicle-http.service';

import type { Vehicle } from '@shared/models/vehicle.interface';
import { VEHICLE_DATA } from '@test/vehicle.data';

const apiUrl = 'assets/data';
const apiBaseEndPoint = 'vehicle.data.json';
const vehicleUrl = `${apiUrl}/${apiBaseEndPoint}`;

describe('VehicleHttpService', () => {
  let spectator: SpectatorHttp<VehicleHttpService>;

  const fakeResponse: Vehicle[] = VEHICLE_DATA;
  const httpClient = { get: jest.fn() };
  httpClient.get.mockReturnValue(scheduled([fakeResponse], asapScheduler));

  const createHttp = createHttpFactory({
    service: VehicleHttpService,
    providers: [{ provide: HttpClient, useValue: httpClient }],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('get', () => {
    it('should make an http get request and return the correct value', () => {
      jest.spyOn(httpClient, 'get');

      const data = spectator.service.get();

      expect(httpClient.get).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalledWith(vehicleUrl);

      data.subscribe((value: Vehicle[]) => {
        expect(value).toEqual(fakeResponse);
      });
    });
  });
});
