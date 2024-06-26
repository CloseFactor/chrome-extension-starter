import styles from '../components/sidebar/sidebar.module.css';
import { MessageType } from '../../../shared/models/messages.model';

/**
 * Embeds the sidebar wrapper iframe into the page.
 */

const IFRAME_ID: string = 'ext-outer-iframe';
let cachedStyle: string;

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === MessageType.SHOW_EXTENSION) {
    showSidebar();
  } else if (message.type === MessageType.HIDE_EXTENSION) {
    hideSidebar();
  }
  return false;
});

export function embedSidebar() {
  const iframeUrl: string = chrome.runtime.getURL(
    'extension/modules/sample-sidebar/components/sidebar/sidebar-wrapper.html'
  );
  const styleUrl: string = chrome.runtime.getURL('assets/sidebar.css');

  // Append Stylesheet to document (could also be done in manifest but this seems more flexible)
  // This style sheet needs to be able to apply style to the outer iFrame embedded in the page, so must
  // be part of the page the user is viewing rather than the sidebar-wrapper.
  const style: HTMLLinkElement = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = styleUrl;
  document.head.append(style);

  // Append outer iFrame to document
  const iframe: HTMLIFrameElement = document.createElement('iframe');
  iframe.id = IFRAME_ID;
  iframe.style.display = 'none';
  iframe.src = iframeUrl;
  iframe.classList.add(styles.iframeStyle);

  document.body.appendChild(iframe);
}

export function showSidebar() {
  const iframe: HTMLIFrameElement | null = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
  if (iframe) {
    cachedStyle = document.body.getAttribute('style') || '';
    document.body.setAttribute(
      'style',
      'position: absolute; width: calc(100% - 350px); max-width: calc(100% - 350px); transition: max-width 0.5s ease 0s, width 0.5s ease 0s;'
    );
    iframe.style.display = 'flex';
  }
}

export function hideSidebar() {
  const iframe: HTMLIFrameElement | null = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
  if (iframe) {
    document.body.setAttribute('style', cachedStyle);
    iframe.style.display = 'none';
  }
}

embedSidebar();
