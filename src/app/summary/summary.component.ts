import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import type { Vehicle } from '@shared/models/vehicle.interface';
import { VehicleService } from '@shared/services/vehicle.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  vehicle$!: Observable<Vehicle | undefined>;

  constructor(private router: Router, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.assignObsValues();
  }

  onClick(): void {
    this.router.navigateByUrl('home');
  }

  private assignObsValues(): void {
    const { selection$ } = this.vehicleService;

    this.vehicle$ = selection$;
  }
}
