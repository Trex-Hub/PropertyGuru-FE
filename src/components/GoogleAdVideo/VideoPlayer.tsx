'use client';
import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import { isMobile } from 'react-device-detect';
import 'video.js/dist/video-js.css';

type VideoPlayerProps = {
  ima: any;
  sources: any;
};

const VideoPlayer = ({ ima, ...props }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      playerRef.current = videoRef.current
        ? videojs(videoRef.current, {
            controls: true,
            muted: true,
            preload: 'auto',
            autoplay: !isMobile, // if mobile device then autoplay is false
            ...props,
          })
        : null;

      typeof playerRef.current?.ima === 'function'
        ? playerRef.current.ima(ima)
        : null;
    }, 0);

    setTimeout(() => {
      // if mobile device then hide ima ads container because it blocks the big play button
      if (isMobile) {
        const allImaAdsContainer = document.querySelectorAll(
          '[id$=ima-ad-container]'
        ) as NodeListOf<HTMLElement>;
        allImaAdsContainer.forEach(container => {
          if (container?.style) {
            container.style.display = 'none';
          }
        });
      }
    }, 500);

    return () => {
      playerRef.current?.dispose();
    };
  }, []);

  return (
    <div className='py-4'>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className='video-js vjs-default-skin w-[300px] h-[250px] sm:w-[400px] sm:h-[300px] md:w-[400px] md:h-[333px]'
          width='300'
          height='250'
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
