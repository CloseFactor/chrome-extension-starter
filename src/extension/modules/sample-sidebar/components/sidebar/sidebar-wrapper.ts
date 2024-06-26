import { Message, MessageType } from '../../../../shared/models/messages.model';
import { Environment } from '../../../../../shared/environment';

/**
 * Listens for messages from the background script and updates the iframe with the new page.
 */

const ROOT_DOMAIN = Environment.sidebarDomain;
const IFRAME_ID: string = 'inner-iframe';

export function init() {
  chrome.runtime.onMessage.addListener((message: Message) => {
    if (message.type === MessageType.SHOW_EXTENSION) {
      updatePage(message.url);
    }
  });
  chrome.runtime.sendMessage({ type: MessageType.GET_CURRENT_TAB_URL }).then((response) => {
    if (response?.currentTabUrl) {
      updatePage(response.currentTabUrl);
    }
  });
}

export function updatePage(url?: string) {
  const iframe: HTMLIFrameElement | null = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
  if (iframe) {
    iframe.src = `${ROOT_DOMAIN}/${url}`;
  }
}

init();
