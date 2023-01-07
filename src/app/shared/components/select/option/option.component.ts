import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import type { Color } from '@shared/models/color.type';

@Component({
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  selector: 'option[hls-option]',
  exportAs: 'hlsOption',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.hls-option-disabled]': 'disabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
  @Input()
  @HostBinding('attr.color')
  color: Color = 'primary';
  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;
  @Input() disabled: boolean = false;
}
