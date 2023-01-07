import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

import type { LabelColor } from '@shared/components/label/label.component';
import { RippleDirective } from '@shared/directives/ripple.directive';
import type { Color } from '@shared/models/color.type';
import { checkHtmlElementAttributes } from '@shared/helpers/element-attribute-check';

const BUTTON_HOST_ATTRIBUTES = [
  'hls-button',
  'hls-button-flat',
  'hls-button-raised',
  'hls-button-stroked',
];

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  selector: `button[hls-button], button[hls-button-flat], button[hls-button-raised], button[hls-button-stroked]`,
  exportAs: 'hlsButton',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.hls-button-disabled]': 'disabled',
  },
  hostDirectives: [RippleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input()
  @HostBinding('attr.color')
  color: Color = 'primary';
  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;
  @Input() disabled: boolean = false;
  @Input()
  @HostBinding('attr.fullWidth')
  fullWidth: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    checkHtmlElementAttributes(
      BUTTON_HOST_ATTRIBUTES,
      this.elementRef.nativeElement
    );
  }

  get labelColor(): LabelColor {
    switch (this.color) {
      case 'primary':
        return 'sun';
      case 'secondary':
        return 'info';
      case 'danger':
        return 'white';
    }
  }

  @HostListener('pointerdown', ['$event']) onPointerDownHandler(
    event: MouseEvent
  ): void {
    event.preventDefault();
  }
}
