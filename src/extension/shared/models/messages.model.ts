/**
 * Defines a common interface for messages sent between the background script and the content script.
 */
export interface Message {
  type: MessageType;
  url?: string;
  data?: string;
  tabId?: number;
}

/**
 * Enumerates the types of messages that can be sent between the background script and the content script.
 */
export enum MessageType {
  SHOW_EXTENSION = 'show_extension',
  HIDE_EXTENSION = 'hide_extension',
  GET_CURRENT_TAB_URL = 'get_current_tab_url',
}
