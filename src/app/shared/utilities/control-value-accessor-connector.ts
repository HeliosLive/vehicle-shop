import { Component, Injector, Input, ViewChild } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
} from '@angular/forms';

@Component({
  template: '',
})
export class ControlValueAccessorConnector implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  @Input()
  formControl!: FormControl;
  @Input()
  formControlName!: string;

  /* istanbul ignore next */
  get control() {
    return (
      this.formControl ||
      this.controlContainer.control?.get(this.formControlName)
    );
  }

  constructor(private injector: Injector) {}

  /* istanbul ignore next */
  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  /* istanbul ignore next */
  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  /* istanbul ignore next */
  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  /* istanbul ignore next */
  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor?.setDisabledState!(isDisabled);
  }
}
