import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';

import { HlsButtonModule } from '@shared/components/button/button.module';
import { HlsLabelModule } from '@shared/components/label/label.module';

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    HlsButtonModule,
    HlsLabelModule,
  ],
  exports: [SummaryComponent],
})
export class SummaryModule {}
