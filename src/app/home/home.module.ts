import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HLSButtonModule } from '@shared/components/button/button.module';
import { HLSLabelModule } from '@shared/components/label/label.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, HLSButtonModule, HLSLabelModule],
  exports: [HomeComponent],
})
export class HomeModule {}
