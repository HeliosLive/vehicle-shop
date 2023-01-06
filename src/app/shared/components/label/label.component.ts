import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

export type LabelSize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subheading-1'
  | 'subheading-2'
  | 'subheading-bold-2'
  | 'subheading-bold-3'
  | 'p1'
  | 'p2'
  | 'caption'
  | 'overline'
  | 'overline-2'
  | 'stats';

export type LabelColor =
  | 'white'
  | 'black'
  | 'sun'
  | 'moon'
  | 'neutral-1'
  | 'neutral-2'
  | 'neutral-3'
  | 'info'
  | 'danger';

@Component({
  selector: 'hls-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() for?: string;
  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  @Input()
  @HostBinding('attr.data-size')
  size: LabelSize = 'p1';

  @Input()
  @HostBinding('attr.data-color')
  color: LabelColor = 'info';

  @Input()
  @HostBinding('attr.data-ellipsis')
  ellipsis?: boolean;

  @Input()
  @HostBinding('attr.data-underline')
  underline?: boolean;

  @Input()
  @HostBinding('attr.data-disabled')
  disabled?: boolean;

  @Input()
  @HostBinding('attr.data-pointer')
  pointer?: boolean;
}
