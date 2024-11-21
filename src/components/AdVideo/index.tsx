'use client';
import { cn } from '@/lib/utils';
import { ResponseStatusEnum } from '@/models/common';
import { getHomePageAds } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import logger from '@/utils/logger';
import { useEffect, useState } from 'react';

interface Props {
  backgroundColor?: string;
}
type HomeAdsData = any;

export default function AdVideo({ backgroundColor }: Props) {
  const [homeAdsData, setHomeAdsData] = useState<HomeAdsData>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await getHomePageAds();
      if (status === ResponseStatusEnum.SUCCESS) {
        setHomeAdsData(data);
      } else {
        logger.error('Fetching ads was not successful. Status:', status);
        setHomeAdsData([]);
      }
    };

    fetchData().catch(error => {
      logger.error('Error in useEffect fetchData', error);
    });
  }, []);

  return (
    <div
      className={cn(
        'w-full items-center justify-center  flex  ',
        backgroundColor
      )}>
      <div className='w-[18.75rem] md:h-[17rem] md:w-[25rem] p-6  px-2'>
        {homeAdsData && (
          <video controls muted className=' h-full w-full'>
            <source
              src={`${NEXT_PUBLIC_ASSETS_URL}${homeAdsData?.data?.attributes?.videoAd?.data?.attributes?.url || ''}`}
              type='video/mp4'
              className='object-cover'
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
