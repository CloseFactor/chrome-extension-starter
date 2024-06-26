# Chrome Extension Starter

## Installing

Clone the repository and then run `npm i` in the root directory.

## Building

Build extension package once (prod):

```bash
npm run build
```

Build extension package once (dev):

```bash
npm run dev
OR
npm run local # local overrides
```

Build continuously (dev):

```bash
npm run dev:watch
OR
npm run local:watch # local overrides
```

Build continuously (prod):

```bash
npm run build:watch
```

## Installing

After building, the unpacked extension exists in the `dist/` directory.

1. Launch Chrome and navigate to [chrome://extensions/](chrome://extensions/).
2. Select `Load Unpacked` from the upper left of the page.
3. Select the `dist/` folder from the build output above as the root directory to load.

Note: It doesn't appear that chrome extensions automatically reload their source, so you may have to click the reload or update buttons on the extension page.

## Deploy to Chrome Webstore

### Signup:

1. Sign up for Chrome webstore developer account (pay $5)

### Deploy:

1. Change version in BOTH manifest.json AND package.json
2. build prod extension `npm run build`
3. zip build `zip -r dist.zip dist`
4. Developer dashboard > Package > Upload new package
5. Developer dashboard > Distribution > Submit for review
