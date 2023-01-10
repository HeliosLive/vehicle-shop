import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

import { HlsButtonModule } from '@shared/components/button/button.module';
import { HlsLabelModule } from '@shared/components/label/label.module';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    AngularSvgIconModule,
    HlsButtonModule,
    HlsLabelModule,
  ],
  exports: [ErrorComponent],
})
export class ErrorModule {}
