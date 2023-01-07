export function checkHtmlElementAttributes(
  hostAttributes: string[],
  element: HTMLElement
): void {
  for (const attr of hostAttributes) {
    if (hasHostAttributes(element, attr)) {
      element.classList.add(attr);
    }
  }
}

function hasHostAttributes(
  element: HTMLElement,
  ...attributes: string[]
): boolean {
  return attributes.some((attribute) => element.hasAttribute(attribute));
}
