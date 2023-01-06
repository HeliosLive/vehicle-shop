import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Input,
} from '@angular/core';

export type RippleColor = 'light' | 'dark';
export type RippleSpeed = 'slow' | 'normal' | 'fast';

@Directive({
  selector: '[hlsRipple]',
  standalone: true,
})
export class RippleDirective {
  private _rippleColor: RippleColor = 'light';
  private _rippleSpeed: RippleSpeed = 'normal';

  @Input()
  set rippleColor(color: RippleColor) {
    this._rippleColor = color;
  }
  @Input()
  set rippleSpeed(speed: RippleSpeed) {
    this._rippleSpeed = speed;
  }

  constructor(private el: ElementRef) {}

  @HostBinding('class.ripple-container') ripple = true;

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    const element = this.el.nativeElement;

    if (element.getElementsByClassName('ripple').length > 0) {
      element.removeChild(element.querySelector('.ripple'));
    }

    const circle = document.createElement('div');
    element.appendChild(circle);

    const d = Math.max(element.clientWidth, element.clientHeight);
    const side = `${d}px`;
    circle.style.height = side;
    circle.style.width = side;
    circle.style.left = `${event.clientX - element.offsetLeft - d / 2}px`;
    circle.style.top = `${event.clientY - element.offsetTop - d / 2}px`;

    circle.classList.add(...this.rippleClasses());
  }

  private rippleClasses(): string[] {
    return [`ripple`, `${this._rippleColor}`, `${this._rippleSpeed}`];
  }
}
