import { NgModule } from '@angular/core';

import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

import { Icons } from './icons.enum';

@NgModule({
  imports: [AngularSvgIconModule.forRoot()],
})
export class SvgRegisterModule {
  constructor(private iconReg: SvgIconRegistryService) {
    /* flow */
    this.iconReg
      .loadSvg(`assets/svg/${Icons.info}.svg`, Icons.info)
      ?.subscribe();
    this.iconReg
      .loadSvg(`assets/svg/${Icons.error}.svg`, Icons.error)
      ?.subscribe();
  }
}
