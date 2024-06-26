import {registerSampleModule} from "./modules/sample-module/sample.module";

/**
 * Service Worker is the long-running mechanism of the Chrome extension. Logic here will be executed when the extension
 * is installed, updated, or when the browser is started. Chrome runtime listeners and other methods created in the
 * service worker will be available throughout the life of the extension.
 *
 * Note: Sometimes the extension will put the service worker to sleep when it is not in use. This is to save resources
 * and improve performance. When some extension listener is triggered again, the service worker will be woken up.
 * You can use chrome.alarms.create and chrome.alarms.onAlarm if the extension needs to wake up at an interval.
 */

// In this example, all listeners and logic for the extension are split into modules. Each module is imported and
// registered here. This keeps the service worker clean and easy to read.
registerSampleModule();

