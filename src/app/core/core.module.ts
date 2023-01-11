import { NgModule } from '@angular/core';

import { LottieAnimationModule } from './lottie-animation/lottie-animation.module';
import { SvgRegisterModule } from './svg-register/svg-register.module';

@NgModule({
  imports: [SvgRegisterModule, LottieAnimationModule],
})
export class CoreModule {}
