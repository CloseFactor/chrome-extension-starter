import { SessionStorageService } from '../../shared/services/session-storage.service';
import { Message, MessageType } from '../../shared/models/messages.model';
import {
  SessionMapNames,
  SidebarDisplayMode,
} from '../../shared/models/session-storage.model';
import { SAMPLE_PAGE_URL_REGEX } from '../../../shared/lib/page-regex';

const sessionStorageService = new SessionStorageService();

export function registerSampleSidebarModule() {
  registerExtensionSidebarUpdater();
  registerCurrentTabListener();
  registerCurrentTabUrlListener();
}

function registerCurrentTabListener() {
  chrome.runtime.onMessage.addListener((request: Message, sender) => {
    if (request.type === MessageType.GET_CURRENT_TAB) {
      return Promise.resolve({ currentTab: sender.tab });
    }
    return false;
  });
}

function registerCurrentTabUrlListener() {
  chrome.runtime.onMessage.addListener(
    (request: Message, sender, sendResponse) => {
      if (request.type === MessageType.GET_CURRENT_TAB_URL) {
        (async () => {
          if (sender.tab && sender.tab.id) {
            const displayMode =
              await sessionStorageService.getFromMap<SidebarDisplayMode>(
                SessionMapNames.TAB_IDS_TO_DISPLAY_URLS,
                String(sender.tab.id)
              );
            sendResponse({ currentTabUrl: displayMode?.tabUrl });
          } else {
            sendResponse({ currentTabUrl: undefined });
          }
        })();
        return true; // Will respond asynchronously
      }
      return false;
    }
  );
}

function registerExtensionSidebarUpdater() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      if (tab.url?.match(SAMPLE_PAGE_URL_REGEX)) {
        return displaySidebar({
          type: MessageType.SHOW_EXTENSION,
          url: '',
          tabId,
        } as Message);
      }
    }
    return false;
  });
}

async function displaySidebar(request: Message) {
  if (!request.tabId) return;

  let displayMode = await sessionStorageService.getFromMap<SidebarDisplayMode>(
    SessionMapNames.TAB_IDS_TO_DISPLAY_URLS,
    String(request.tabId)
  );

  if (!displayMode) {
    displayMode = {
      tabId: request.tabId,
      tabUrl: request.url,
      extensionUrl: request.url,
    };

    await sessionStorageService.setToMap<SidebarDisplayMode>(
      SessionMapNames.TAB_IDS_TO_DISPLAY_URLS,
      String(request.tabId),
      displayMode
    );

    await chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      files: ['./scripts/sidebar.content.js'],
      injectImmediately: true,
    });
  }

  if (request.type === MessageType.SHOW_EXTENSION) {
    return chrome.tabs.sendMessage(request.tabId, {
      type: MessageType.SHOW_EXTENSION,
      url: request.url,
      tabId: request.tabId,
    } as Message);
  } else {
    return chrome.tabs.sendMessage(request.tabId, {
      type: MessageType.HIDE_EXTENSION,
      tabId: request.tabId,
    } as Message);
  }
}
