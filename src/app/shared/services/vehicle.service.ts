import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import type {
  Vehicle,
  VehicleFormData,
} from '@shared/models/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private data: Vehicle[] = [];

  private selection = new BehaviorSubject<Vehicle | undefined>(undefined);
  selection$ = this.selection.asObservable();

  private vehicleType = new BehaviorSubject<Vehicle['type'][]>([]);
  public readonly vehicleType$ = this.vehicleType.asObservable();

  private vehicleBrand = new BehaviorSubject<Vehicle['brand'][]>([]);
  public readonly vehicleBrand$ = this.vehicleBrand.asObservable();

  private vehicleColors = new BehaviorSubject<Vehicle['colors']>([]);
  public readonly vehicleColors$ = this.vehicleColors.asObservable();

  constructor() {}

  set(value: Vehicle[]): void {
    this.data = value;
    this.setProperties();
  }

  select(value: VehicleFormData): void {
    const vehicle = this.data.find((datum) => {
      datum.type === value.type &&
        datum.brand === value.brand &&
        datum.colors.includes(value.color);
    });

    this.selection.next(vehicle);
  }

  private setProperties(): void {
    this.setTypeProperty();
    this.setBrandProperty();
    this.setColorsProperty();
  }

  private setTypeProperty(): void {
    const types = this.data.map((value: Vehicle) => value.type);
    this.vehicleType.next([...new Set(types)]);
  }

  private setBrandProperty(): void {
    const brands = this.data.map((value: Vehicle) => value.brand);
    this.vehicleBrand.next([...new Set(brands)]);
  }

  private setColorsProperty(): void {
    const colors = this.data.map((value: Vehicle) => value.colors).flat(1);
    this.vehicleColors.next([...new Set(colors)]);
  }
}
