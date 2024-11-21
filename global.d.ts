interface GoogleTag {
  cmd: Array<() => void>;
  defineSlot: (adUnitPath: string, size: number[], divId: string) => any;
  pubads: () => {
    refresh: any;
    enableSingleRequest: () => void;
  };
  enableSingleRequest: () => void;
  enableServices: () => void;
  display: (divId: string) => void;
  destroySlots: () => void;
  _adSlots?: { [key: string]: any };
}

// Extend the Window interface to include googletag with the proper type
declare global {
  interface Window {
    googletag: GoogleTag;
  }
}
// src/global.d.ts

declare namespace google {
  namespace ima {
    class AdDisplayContainer {
      constructor(adContainer: Element);
      initialize(): void;
    }

    class AdsLoader {
      constructor(settings: any);
      requestAds(request: { adTagUrl: string }): void;
      addEventListener(eventType: string, handler: (event: any) => void): void;
    }

    class AdsManager {
      constructor(settings: any);
      init(width: number, height: number, viewMode: string): void;
      start(): void;
    }

    class AdErrorEvent {
      static readonly Type: { AD_ERROR: string };
      getError(): any;
    }

    class AdEvent {
      static readonly Type: { LOADED: string };
    }

    const ViewMode: {
      NORMAL: string;
      FULLSCREEN: string;
      THUMBNAIL: string;
      MINIMIZED: string;
    };
  }
}
