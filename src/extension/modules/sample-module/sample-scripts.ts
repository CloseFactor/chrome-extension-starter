import manifest from '@public/manifest.json';

/**
 * Injects scripts into specified tab to update the DOM with sample meta tags
 * @param tabId
 */
export async function injectMetaScripts(tabId: number) {
  await injectSampleMetaTagScripts(tabId);
  return Promise.resolve();
}

/**
 * Injects the script that inserts sample meta tags into page DOM
 * @param tabId id of tab to inject scripts into
 */
async function injectSampleMetaTagScripts(tabId: number) {
  const version = manifest?.version ?? '0.0.0';
  return chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: false,
    func: addVersionMetaTag,
    args: [version]
  });
}

/**
 * Adds meta tags to the DOM, updates the tag if it already exists
 * @param version
 */
function addVersionMetaTag(version: string) {
  const metaTagName = 'sample-extension-version';
  const metaTags = document.querySelectorAll('meta');
  let metaVersion;
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].name === metaTagName) {
      metaVersion = metaTags[i];
      break;
    }
  }
  if (!metaVersion) {
    metaVersion = document.createElement('meta');
    metaVersion.name = metaTagName;
    document.head.appendChild(metaVersion);
  }

  metaVersion.content = version;
}
