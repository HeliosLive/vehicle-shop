import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { VehicleService } from './vehicle.service';

import type { Vehicles, Vehicle } from '@shared/models/vehicle.interface';
import { VEHICLE_DATA } from '@test/vehicle.data';

describe('VehicleService', () => {
  let spectator: SpectatorService<VehicleService>;

  const createService = createServiceFactory({
    service: VehicleService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('set', () => {
    beforeEach(() => {
      spectator.service.set(VEHICLE_DATA);
    });

    it('should set all vehicle types correctly', () => {
      const types = VEHICLE_DATA.map((value: Vehicles) => value.type);
      const expectation = [...new Set(types)];

      spectator.service.vehicleType$.subscribe((value: Vehicles['type'][]) => {
        expect(value).toEqual(expectation);
      });
    });

    it('should set all vehicle brands correctly', () => {
      const brands = VEHICLE_DATA.map((value: Vehicles) => value.brand);
      const expectation = [...new Set(brands)];

      spectator.service.vehicleBrand$.subscribe(
        (value: Vehicles['brand'][]) => {
          expect(value).toEqual(expectation);
        }
      );
    });

    it('should set all vehicle colors correctly', () => {
      const colors = VEHICLE_DATA.map((value: Vehicles) => value.colors);
      const expectation = [...new Set(colors)];

      spectator.service.vehicleColors$.subscribe(
        (value: Vehicles['colors']) => {
          expect(value).toEqual(expectation);
        }
      );
    });
  });

  describe('filter', () => {
    beforeEach(() => {
      spectator.service.set(VEHICLE_DATA);
    });

    it('should filter the data from the source and assign the correct properties', () => {
      const { type, brand, colors } = VEHICLE_DATA[0];
      const value: Partial<Vehicle> = { type, brand, color: colors[0] };

      let filteredData = VEHICLE_DATA;
      filteredData = filteredData
        .filter((datum: Vehicles) => datum.type === type)
        .filter((datum: Vehicles) => datum.brand === brand)
        .filter((datum: Vehicles) => datum.colors.includes(colors[0]));

      spectator.service.filter(value);

      const typeExpectation = filteredData.map((value: Vehicles) => value.type);
      const brandExpectation = filteredData.map(
        (value: Vehicles) => value.brand
      );
      const colorsExpectation = filteredData
        .map((value: Vehicles) => value.colors)
        .flat(1);

      spectator.service.vehicleType$.subscribe((value: Vehicles['type'][]) => {
        expect(value).toEqual(typeExpectation);
      });
      spectator.service.vehicleBrand$.subscribe(
        (value: Vehicles['brand'][]) => {
          expect(value).toEqual(brandExpectation);
        }
      );
      spectator.service.vehicleColors$.subscribe(
        (value: Vehicles['colors']) => {
          expect(value).toEqual(colorsExpectation);
        }
      );
    });
  });

  describe('select', () => {
    beforeEach(() => {
      spectator.service.set(VEHICLE_DATA);
    });

    it('should set the selected vehicle correctly if it exists', () => {
      const { type, brand, colors } = VEHICLE_DATA[0];
      const vehicle: Vehicle = {
        type,
        brand,
        color: colors[0],
      };
      spectator.service.select(vehicle);

      spectator.service.selection$.subscribe((value: Vehicle | undefined) => {
        expect(value).toEqual(VEHICLE_DATA[0]);
      });
    });

    it('should set the selected vehicle as undefined if it does not exist', () => {
      const vehicle: Vehicle = {
        type: 'test invalid type',
        brand: 'test invalid brand',
        color: 'test invalid color',
      };
      spectator.service.select(vehicle);

      spectator.service.selection$.subscribe((value: Vehicle | undefined) => {
        expect(value).toEqual(undefined);
      });
    });
  });
});
