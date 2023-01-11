import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HlsButtonModule } from '@shared/components/button/button.module';
import { HlsLabelModule } from '@shared/components/label/label.module';
import { HlsLottieAnimationModule } from '@shared/components/lottie-animation/lottie-animation.module';
import { HlsSelectModule } from '@shared/components/select/select.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    HomeRoutingModule,
    HlsButtonModule,
    HlsLabelModule,
    HlsLottieAnimationModule,
    HlsSelectModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
