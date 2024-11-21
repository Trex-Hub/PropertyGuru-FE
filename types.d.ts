// types.d.ts or in your global type declaration file
declare global {
  interface Window {
    googletag: GoogleTag;
  }

  // Extending the pubads service to include the missing 'refresh' method
  interface GoogletagPubAds {
    refresh: (slots?: googletag.Slot[]) => void;
    enableSingleRequest: () => void;
    // Add other existing methods if needed
  }

  // Extend the main GoogleTag interface to include the extended pubads
  interface GoogleTag {
    cmd: Array<() => void>;
    pubads: () => GoogletagPubAds;
    enableServices: () => void;
    defineSlot: (
      adUnitPath: string,
      size: googletag.GeneralSize,
      divId: string
    ) => googletag.Slot;
    display: (id: string) => void;
    _adSlots?: { [key: string]: googletag.Slot };
  }
}
