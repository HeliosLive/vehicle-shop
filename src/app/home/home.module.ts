import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HlsButtonModule } from '@shared/components/button/button.module';
import { HlsLabelModule } from '@shared/components/label/label.module';
import { HlsSelectModule } from '@shared/components/select/select.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HlsButtonModule,
    HlsLabelModule,
    HlsSelectModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
