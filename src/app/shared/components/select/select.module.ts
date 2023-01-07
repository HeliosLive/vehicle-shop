import { NgModule } from '@angular/core';

import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';

@NgModule({
  declarations: [SelectComponent, OptionComponent],
  exports: [SelectComponent, OptionComponent],
})
export class HlsSelectModule {}
