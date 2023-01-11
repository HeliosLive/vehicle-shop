import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LottieModule } from 'ngx-lottie';

import { LottieAnimationComponent } from './lottie-animation.component';

@NgModule({
  declarations: [LottieAnimationComponent],
  imports: [CommonModule, LottieModule],
  exports: [LottieAnimationComponent],
})
export class HlsLottieAnimationModule {}
