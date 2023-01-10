import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import type { Vehicles } from '@shared/models/vehicle.interface';

/**
 * I would not use the data like this:
 * const trafficMeister = require('@shared/mocks/mock-vehicle-data');
 * more info: https://angular.io/guide/build#configuring-commonjs-dependencies
 */

@Injectable({ providedIn: 'any' })
export class VehicleHttpService {
  /**
   * We can also use injection token but we do not need this yet in a small app
   */
  private endpoint = 'assets/data/vehicle.data.json';

  constructor(private httpClient: HttpClient) {}

  get(): Observable<Vehicles[]> {
    /**
     * If you want to take the chances such as 'an error occurred' from the call,
     * by adding the `retry` operator, we can easily find a solution.
     */
    return this.httpClient.get<Vehicles[]>(this.endpoint);
  }
}
