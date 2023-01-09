import { Component, OnInit } from '@angular/core';

import { Observable, take, tap } from 'rxjs';

import type { Vehicle } from '@shared/models/vehicle.interface';
import { VehicleHttpService } from '@shared/services/vehicle-http.service';
import { VehicleService } from '@shared/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  type$!: Observable<Vehicle['type'][]>;
  brand$!: Observable<Vehicle['brand'][]>;
  colors$!: Observable<Vehicle['colors']>;

  constructor(
    private readonly vehicleHttpService: VehicleHttpService,
    private readonly vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.vehicleHttpService
      .get()
      .pipe(
        tap((value) => {
          this.vehicleService.set(value);
          this.assignObsValues();
        }),
        take(1) // only one fetch is enough otherwise we can use takeUntil
      )
      .subscribe();
  }

  private assignObsValues(): void {
    const { vehicleType$, vehicleBrand$, vehicleColors$ } = this.vehicleService;
    this.type$ = vehicleType$;
    this.brand$ = vehicleBrand$;
    this.colors$ = vehicleColors$;
  }
}
