import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

// Declare GoogleTag global types
declare global {
  interface Window {
    googletag: GoogleTag;
  }
}

interface AdBannerProps {
  slotName: string;
  slotId: string;
  minWidth: string;
  minHeight: string;
  isTransitioning: boolean;
  backgroundColor?: string;
}

const GoogleAdSense = ({
  slotName,
  slotId,
  minWidth,
  minHeight,
  isTransitioning,
  backgroundColor,
}: AdBannerProps) => {
  useEffect(() => {
    const initGoogleTag = () => {
      if (window.googletag?.cmd) {
        window.googletag.cmd.push(() => {
          if (!window.googletag._adSlots) {
            window.googletag._adSlots = {};
          }

          const adSlots = window.googletag._adSlots;

          if (!adSlots[slotId]) {
            const slot = window.googletag
              .defineSlot(
                slotName,
                [parseInt(minWidth, 10), parseInt(minHeight, 10)],
                slotId
              )
              .addService(window.googletag.pubads());

            adSlots[slotId] = slot;

            window.googletag.pubads().enableSingleRequest();
            window.googletag.enableServices();
          } else {
            const pubads = window.googletag.pubads();
            if (typeof pubads.refresh === 'function') {
              pubads.refresh([adSlots[slotId]]);
            }
          }

          window.googletag.display(slotId);
        });
      }
    };

    if (!isTransitioning && typeof window !== 'undefined') {
      initGoogleTag();
    }

    return () => {
      if (window.googletag?.cmd && window.googletag._adSlots?.[slotId]) {
        window.googletag.cmd.push(() => {
          // Optionally clean up ad slots
        });
      }
    };
  }, [slotName, slotId, minWidth, minHeight, isTransitioning]);

  return (
    <div
      className={cn('justify-center flex items-center ', backgroundColor)}
      style={{ minWidth, minHeight }}>
      <div id={slotId} />
    </div>
  );
};

export default GoogleAdSense;
