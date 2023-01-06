import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';

import { HLSLabelModule } from '../label/label.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [HLSLabelModule],
  exports: [ButtonComponent],
})
export class HLSButtonModule {}
