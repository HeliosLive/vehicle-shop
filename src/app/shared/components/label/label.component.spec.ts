import { Component } from '@angular/core';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import type { LabelColor, LabelSize } from './label.component';
import { LabelComponent } from './label.component';
import { HLSLabelModule } from './label.module';

@Component({
  selector: 'app-content-projection-test',
  standalone: true,
  imports: [HLSLabelModule],
  template: `<hls-label>{{ projectedContent }}</hls-label>`,
})
export class ContentProjectionTestComponent {
  public projectedContent = 'Some Text';
}

describe('LabelComponent', () => {
  const props = {
    size: 'h1' as LabelSize,
    color: 'info' as LabelColor,
    for: 'some-element',
    ellipsis: true,
    pointer: true,
    underline: true,
    disabled: true,
    testId: 'label-test-id',
  };

  let spectator: Spectator<LabelComponent>;
  const createComponent = createComponentFactory({
    component: LabelComponent,
    shallow: true,
  });
  let ContentProjectionSpectator: Spectator<ContentProjectionTestComponent>;
  const createContentProjectionComponent = createComponentFactory({
    component: ContentProjectionTestComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props,
    });
    ContentProjectionSpectator = createContentProjectionComponent({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should Host have data-cy attribute equals to testId input', () => {
    expect(spectator.element).toHaveAttribute('data-cy', props.testId);
    expect(spectator.element).not.toHaveAttribute(
      'data-cy',
      `wrong=${props.testId}`
    );
  });

  it('should color data attribute equals to color input', () => {
    const attribute = spectator.element?.getAttribute('data-color');

    expect(attribute).toEqual(props.color);
  });

  it('should size data attribute equals to size input', () => {
    const attribute = spectator.element?.getAttribute('data-size');

    expect(attribute).toEqual(props.size);
  });

  it('should ellipsis data attribute equals to ellipsis input', () => {
    const attribute = spectator.element?.getAttribute('data-ellipsis');

    expect(attribute).toEqual(`${props.ellipsis}`);
  });

  it('should underline data attribute equals to underline input', () => {
    const attribute = spectator.element?.getAttribute('data-underline');

    expect(attribute).toEqual(`${props.underline}`);
  });

  it('should disabled data attribute equals to disabled input', () => {
    const attribute = spectator.element?.getAttribute('data-disabled');

    expect(attribute).toEqual(`${props.disabled}`);
  });

  it('should pointer data attribute equals to pointer input', () => {
    const attribute = spectator.element?.getAttribute('data-pointer');

    expect(attribute).toEqual(`${props.pointer}`);
  });

  it('should display the projected content correctly', () => {
    const projectedElement: HTMLDivElement | null =
      ContentProjectionSpectator.query('fl-label');
    expect(projectedElement?.textContent).toEqual(
      ContentProjectionSpectator.component.projectedContent
    );

    const newElement = '<p>new projected content</p>';
    ContentProjectionSpectator.component.projectedContent = newElement;
    ContentProjectionSpectator.detectChanges();
    expect(ContentProjectionSpectator.element.textContent).toEqual(newElement);
    expect(ContentProjectionSpectator.element.textContent).not.toEqual(
      newElement.repeat(2)
    );
  });

  it('should label for attribute equals to for input', () => {
    expect(spectator.query('[for="some-element"]')).toExist();
    expect(spectator.query('[for="wrong-element"]')).not.toExist();
  });
});
