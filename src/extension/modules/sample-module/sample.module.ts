import { injectMetaScripts } from './sample-scripts';
import {SAMPLE_PAGE_URL_REGEX} from "../../../shared/lib/page-regex";

export function registerSampleModule() {
  registerSampleTabListener();
}

function registerSampleTabListener() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      if (tab.url?.match(SAMPLE_PAGE_URL_REGEX)) {
        return injectMetaScripts(tabId);
      }
    }
    return false;
  });
}
