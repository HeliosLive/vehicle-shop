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

export type ButtonColor = 'primary' | 'secondary' | 'danger';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input()
  @HostBinding('attr.color')
  color: ButtonColor = 'primary';
  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;
  @Input() disabled: boolean = false;
  @Input()
  @HostBinding('attr.fullWidth')
  fullWidth: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.checkButtonAttributes();
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

  private checkButtonAttributes(): void {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        this.getHostElement().classList.add(attr);
      }
    }
  }

  private hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this.getHostElement().hasAttribute(attribute)
    );
  }

  private getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('pointerdown', ['$event']) onPointerDownHandler(
    event: MouseEvent
  ): void {
    event.preventDefault();
  }
}
