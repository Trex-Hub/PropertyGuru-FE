'use client';
import { ResponseStatusEnum } from '@/models/common';
import { getHomePageAds } from '@/services/properties';
import logger from '@/utils/logger';
import { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { ADS_URL, NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';

export default function GoogleAdVideo() {
  const [videoAdData, setVideoAdData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await getHomePageAds();
      if (status === ResponseStatusEnum.SUCCESS) {
        setVideoAdData(data);
      } else {
        logger.error('Fetching ads was not successful. Status:', status);
        setVideoAdData([]);
      }
    };

    fetchData().catch(error => {
      logger.error('Error in useEffect fetchData', error);
    });
  }, []);
  const videoUrl = videoAdData?.data?.attributes?.videoAd?.data?.attributes?.url
    ? `${NEXT_PUBLIC_ASSETS_URL}${videoAdData.data.attributes.videoAd.data.attributes.url}`
    : ADS_URL;
  return (
    <div className='flex justify-center items-center'>
      <VideoPlayer
        sources={[
          {
            src: videoUrl,
            type: 'video/mp4',
          },
        ]}
        ima={{
          adTagUrl:
            'https://pubads.g.doubleclick.net/gampad/ads?iu=/22718860182/pg-video-newWeb&description_url=https%3A%2F%2Fpropertyguru.ae&tfcd=0&npa=0&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=',
        }}
      />
    </div>
  );
}
