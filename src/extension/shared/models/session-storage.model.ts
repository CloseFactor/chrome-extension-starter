export enum SessionMapNames {
  TAB_IDS_TO_DISPLAY_URLS = 'tabIdsToDisplayUrls',
}

export interface SidebarDisplayMode {
  tabId: number;
  extensionUrl?: string;
  tabUrl?: string;
}
