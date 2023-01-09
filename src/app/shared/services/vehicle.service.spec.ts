import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { VehicleService } from './vehicle.service';

import type {
  Vehicle,
  VehicleFormData,
} from '@shared/models/vehicle.interface';
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
    beforeAll(() => {
      spectator.service.set(VEHICLE_DATA);
    });

    it('should set all vehicle types correctly', () => {
      const types = VEHICLE_DATA.map((value: Vehicle) => value.type);
      const expectation = [...new Set(types)];

      spectator.service.vehicleType$.subscribe((value: Vehicle['type'][]) => {
        expect(value).toEqual(expectation);
      });
    });

    it('should set all vehicle brands correctly', () => {
      const brands = VEHICLE_DATA.map((value: Vehicle) => value.brand);
      const expectation = [...new Set(brands)];

      spectator.service.vehicleBrand$.subscribe((value: Vehicle['brand'][]) => {
        expect(value).toEqual(expectation);
      });
    });

    it('should set all vehicle colors correctly', () => {
      const colors = VEHICLE_DATA.map((value: Vehicle) => value.colors);
      const expectation = [...new Set(colors)];

      spectator.service.vehicleColors$.subscribe((value: Vehicle['colors']) => {
        expect(value).toEqual(expectation);
      });
    });
  });

  describe('select', () => {
    it('should set the selected vehicle correctly if it exists', () => {
      const { type, brand, colors } = VEHICLE_DATA[0];
      const vehicle: VehicleFormData = {
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
      const vehicle: VehicleFormData = {
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
