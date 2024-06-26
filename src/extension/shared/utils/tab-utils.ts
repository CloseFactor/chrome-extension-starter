export async function openBackgroundPopup(url: string, currentTabId = 0) {
  return chrome.tabs.create({
    url,
    pinned: true,
    active: false
  });
}
