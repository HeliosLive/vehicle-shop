import { AnimationOptions } from 'ngx-lottie';

export const animationGlobalOptions: AnimationOptions = {
  autoplay: true,
  loop: true,
  renderer: 'svg',
};

export function getAnimationPath(animationId: string): string {
  return `/assets/animations/${animationId}.json`;
}
