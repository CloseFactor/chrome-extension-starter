(async () => {
  // Chrome content scripts do not support module syntax directly, so we use await import on the source URL
  // This is the URL of the transpiled javascript file (should be equivalent to its path from src root)
  const scriptUrl = chrome.runtime.getURL('extension/modules/sample-sidebar/scripts/sidebar.js');
  await import(scriptUrl);
})();
