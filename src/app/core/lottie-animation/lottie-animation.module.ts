import { NgModule } from '@angular/core';

import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
  ],
})
export class LottieAnimationModule {}
