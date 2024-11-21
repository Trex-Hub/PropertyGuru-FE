// components/GoogleAdVideo.tsx
'use client';

import { ResponseStatusEnum } from '@/models/common';
import { getHomePageAds } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import logger from '@/utils/logger';
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

declare global {
  interface Window {
    google: any;
  }
}

type Props = {
  backgroundColor?: string;
};
type HomeAdsData = any;

const GoogleAdVideo: React.FC<Props> = ({ backgroundColor }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [homeAdsData, setHomeAdsData] = useState<HomeAdsData>(null);
  const videoNode = useRef<HTMLVideoElement>(null);
  const adContainer = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);
  const adTagUrl =
    'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';

  useEffect(() => {
    // Fetch the video URL from your API
    const fetchData = async () => {
      const { data, status } = await getHomePageAds();
      if (status === ResponseStatusEnum.SUCCESS) {
        setHomeAdsData(data);
      } else {
        logger.error('Fetching ads was not successful. Status:', status);
        setHomeAdsData([]);
      }
    };
    fetchData();
    setVideoUrl(
      NEXT_PUBLIC_ASSETS_URL +
        homeAdsData?.data?.attributes?.videoAd?.data?.attributes?.url
    );

    const loadGoogleIMASDK = () => {
      const script = document.createElement('script');
      script.src = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
      script.onload = initializePlayer;
      document.body.appendChild(script);
    };

    const initializePlayer = () => {
      if (videoNode.current && adContainer.current) {
        // Initialize the video player
        player.current = videojs(videoNode.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
        });

        // Setup Google IMA SDK
        const adDisplayContainer = new window.google.ima.AdDisplayContainer(
          adContainer.current,
          videoNode.current
        );
        const adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);
        const adsRequest = new window.google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrl;

        adsLoader.addEventListener(
          window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          (event: any) => {
            const adsManager = event.getAdsManager(videoNode.current);

            adsManager.addEventListener(
              window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
              () => {
                player.current?.pause();
              }
            );

            adsManager.addEventListener(
              window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
              () => {
                player.current.play();
              }
            );

            adsManager.addEventListener(
              window.google.ima.AdErrorEvent.Type.AD_ERROR,
              (adErrorEvent: any) => {
                logger.log('Ad error:', adErrorEvent.getError());
                adsManager.destroy();
              }
            );

            // Start the ads manager when user interacts
            const startAds = () => {
              adDisplayContainer.initialize();
              adsManager.init(
                player.current.videoWidth(),
                player.current.videoHeight(),
                window.google.ima.ViewMode.NORMAL
              );
              adsManager.start();
              // Remove the play button once ads start
              document.getElementById('play-button')?.remove();
            };

            // Add event listener to the play button
            document
              .getElementById('play-button')
              ?.addEventListener('click', startAds);
          }
        );

        adsLoader.addEventListener(
          window.google.ima.AdErrorEvent.Type.AD_ERROR,
          (event: any) => {
            logger.log('AdsLoader error:', event.getError());
          }
        );

        // Make the initial request for ads
        adsLoader.requestAds(adsRequest);
      }
    };

    loadGoogleIMASDK();

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [adTagUrl]);

  return (
    <div className={backgroundColor ? backgroundColor : ''}>
      <div ref={adContainer} className='ad-container'>
        <video
          ref={videoNode}
          className='video-js vjs-default-skin'
          controls
          preload='auto'
          width='400'
          height='333'>
          {videoUrl && <source src={videoUrl} />}
        </video>
      </div>
      <button id='play-button'>Play</button>
    </div>
  );
};

export default GoogleAdVideo;
