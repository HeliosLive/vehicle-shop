import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import type { Vehicles, Vehicle } from '@shared/models/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  /**
   * We could also use ngrx for the state.
   * However, this kind of a state in a small app
   * I wouldn't recommend that approach.
   */
  private data: Vehicles[] = [];

  private selection = new BehaviorSubject<Vehicles | undefined>(undefined);
  selection$ = this.selection.asObservable();

  private vehicleType = new BehaviorSubject<Vehicles['type'][]>([]);
  public readonly vehicleType$ = this.vehicleType.asObservable();

  private vehicleBrand = new BehaviorSubject<Vehicles['brand'][]>([]);
  public readonly vehicleBrand$ = this.vehicleBrand.asObservable();

  private vehicleColors = new BehaviorSubject<Vehicles['colors']>([]);
  public readonly vehicleColors$ = this.vehicleColors.asObservable();

  set(value: Vehicles[]): void {
    this.data = value;
    this.filter({});
  }

  select(value: Vehicle): void {
    const vehicle = this.data.find(
      (datum) =>
        datum.type === value.type &&
        datum.brand === value.brand &&
        datum.colors.includes(value.color)
    );

    this.selection.next(vehicle);
  }

  filter(value: Partial<Vehicle>): void {
    const { type, brand, color } = value;
    let filteredData = this.data;

    if (type) {
      filteredData = filteredData.filter(
        (datum: Vehicles) => datum.type === type
      );
    }
    if (brand) {
      filteredData = filteredData.filter(
        (datum: Vehicles) => datum.brand === brand
      );
    }
    if (color) {
      filteredData = filteredData.filter((datum: Vehicles) =>
        datum.colors.includes(color)
      );
    }

    const types = filteredData.map((value: Vehicles) => value.type);
    const brands = filteredData.map((value: Vehicles) => value.brand);
    const colors = filteredData.map((value: Vehicles) => value.colors).flat(1);

    this.vehicleType.next([...new Set(types)]);
    this.vehicleBrand.next([...new Set(brands)]);
    this.vehicleColors.next([...new Set(colors)]);
  }
}
