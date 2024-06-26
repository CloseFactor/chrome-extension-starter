export function simulateClick(node: HTMLElement) {
  triggerMouseEvent(node, 'mouseover');
  triggerMouseEvent(node, 'mousedown');
  triggerMouseEvent(node, 'mouseup');
  triggerMouseEvent(node, 'click');
}

function triggerMouseEvent(node: HTMLElement, eventType: string) {
  const clickEvent = new Event(eventType, { bubbles: true });
  node.dispatchEvent(clickEvent);
}

export function typeIntoTextBox(textBox: HTMLInputElement, text: string) {
  textBox.value = text;
  const event = new Event('input', { bubbles: true });
  textBox.dispatchEvent(event);
}
