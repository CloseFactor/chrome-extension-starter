import manifest from '@public/manifest.json';

const BUTTON_ID = 'sample-btn';
const VERSION_ID = 'version';

async function init() {
  const sampleBtn = document.getElementById(BUTTON_ID);
  sampleBtn?.addEventListener('click', sampleClick);

  const version = manifest?.version;
  const versionElement = document.getElementById(VERSION_ID);
  if (version && versionElement) {
    versionElement.innerText = 'v' + version;
  }
}

export async function sampleClick(e: Event) {
  e.preventDefault();
  alert('Sample button clicked');
}

await init();
