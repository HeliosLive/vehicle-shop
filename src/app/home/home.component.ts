import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject, take, takeUntil, tap } from 'rxjs';

import type { Vehicles, Vehicle } from '@shared/models/vehicle.interface';
import { VehicleHttpService } from '@shared/services/vehicle-http.service';
import { VehicleService } from '@shared/services/vehicle.service';
import { assertTypeMapper } from '@shared/helpers/assert-type-mapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  type$!: Observable<Vehicles['type'][]>;
  brand$!: Observable<Vehicles['brand'][]>;
  colors$!: Observable<Vehicles['colors']>;

  vehicleForm = new FormGroup({
    type: new FormControl<string | null>(null, {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    brand: new FormControl<string | null>(null, {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    color: new FormControl<string | null>(null, {
      validators: [Validators.required],
      updateOn: 'change',
    }),
  });

  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private readonly vehicleHttpService: VehicleHttpService,
    private readonly vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.assignObsValues();
    this.fetchData();
    this.updateFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      this.vehicleService.select(
        assertTypeMapper<Vehicle>(this.vehicleForm.value)
      );
      this.router.navigateByUrl('summary');
    }
  }

  onReset(): void {
    this.vehicleForm.reset();
  }

  private assignObsValues(): void {
    const { vehicleType$, vehicleBrand$, vehicleColors$ } = this.vehicleService;
    this.type$ = vehicleType$;
    this.brand$ = vehicleBrand$;
    this.colors$ = vehicleColors$;
  }

  private fetchData(): void {
    this.vehicleHttpService
      .get()
      .pipe(
        tap((value) => {
          this.vehicleService.set(value);
        }),
        take(1)
      )
      .subscribe();
  }

  private updateFilters(): void {
    this.vehicleForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((value) => {
          if (value) {
            this.vehicleService.filter(assertTypeMapper<Vehicle>(value));
          }
        })
      )
      .subscribe();
  }
}
