import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';

import { HlsLabelModule } from '../label/label.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [HlsLabelModule],
  exports: [ButtonComponent],
})
export class HlsButtonModule {}
