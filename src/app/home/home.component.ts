import { Component, OnInit } from '@angular/core';
import { VehicleHttpService } from '@shared/services/vehicle-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private readonly vehicleHttpService: VehicleHttpService) {}
  ngOnInit(): void {
    this.vehicleHttpService.get().subscribe();
  }
}
