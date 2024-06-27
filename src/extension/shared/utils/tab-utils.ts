export async function openBackgroundPopup(url: string) {
  return chrome.tabs.create({
    url,
    pinned: true,
    active: false,
  });
}
