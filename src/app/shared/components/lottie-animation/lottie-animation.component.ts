import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

import {
  animationGlobalOptions,
  getAnimationPath,
} from '@shared/animations/lottie-animation.options';

@Component({
  selector: 'hls-lottie-animation',
  templateUrl: './lottie-animation.component.html',
  host: {
    class: 'hls-lottie-animation',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottieAnimationComponent implements OnInit {
  @Input() animationPath!: string;

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  animationStyles: Partial<CSSStyleDeclaration> = {
    lineHeight: '0.8',
    maxWidth: '500px',
    margin: '0 auto',
  };
  animationOptions!: AnimationOptions;

  ngOnInit() {
    this.animationOptions = {
      ...animationGlobalOptions,
      path: getAnimationPath(this.animationPath),
    };
  }
}
