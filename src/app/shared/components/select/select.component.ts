import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';

import { OptionComponent } from './option/option.component';

import { checkHtmlElementAttributes } from '@shared/helpers/element-attribute-check';
import type { Color } from '@shared/models/color.type';
import { ControlValueAccessorConnector } from '@shared/utilities/control-value-accessor-connector';

const SELECT_HOST_ATTRIBUTES = ['hls-select'];

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  selector: 'select[hls-select]',
  exportAs: 'hlsSelect',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.hls-select-disabled]': 'disabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent
  extends ControlValueAccessorConnector
  implements OnInit, AfterContentInit
{
  @Input()
  @HostBinding('attr.color')
  color: Color = 'secondary';
  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;
  @Input() disabled: boolean = false;
  @Input()
  @HostBinding('attr.fullWidth')
  fullWidth: boolean = true;

  @ContentChildren(OptionComponent)
  optionComponents: QueryList<OptionComponent> | undefined;

  constructor(injector: Injector, private elementRef: ElementRef) {
    super(injector);
  }

  ngOnInit(): void {
    checkHtmlElementAttributes(
      SELECT_HOST_ATTRIBUTES,
      this.elementRef.nativeElement
    );
  }

  ngAfterContentInit(): void {
    this.appendOptionInputs();
  }

  private appendOptionInputs(): void {
    this.optionComponents?.forEach((element: OptionComponent) => {
      element.color = this.color;
    });
  }
}
