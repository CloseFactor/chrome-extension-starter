import { injectMetaScripts } from './sample-scripts';

const samplePageUrlRegex = /.*google\.com.*|.*localhost:4200.*/;

export function registerSampleModule() {
  registerSampleTabListener();
}

function registerSampleTabListener() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      if (tab.url?.match(samplePageUrlRegex)) {
        return injectMetaScripts(tabId);
      }
    }
    return false;
  });
}
