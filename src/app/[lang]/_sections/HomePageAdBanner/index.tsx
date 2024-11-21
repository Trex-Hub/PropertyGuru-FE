'use client';
import { cn } from '@/lib/utils';
import { ResponseStatusEnum } from '@/models/common';
import { getHomePageAds } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import logger from '@/utils/logger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  backgroundColor?: string;
}
type HomeAdsData = any;

export default function HomePageAdBanner({ backgroundColor }: Props) {
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
    <div className={cn('flex justify-center', backgroundColor)}>
      <div className='hidden md:flex md:items-center md:justify-center lg:flex lg:justify-center lg:items-center'>
        {homeAdsData && (
          <Link
            href={homeAdsData?.data?.attributes?.adLink}
            target='_blank'
            rel='noopener noreferrer'>
            <Image
              width={728}
              height={90}
              alt={`${homeAdsData?.data?.attributes?.damacAd?.data?.attributes?.alternativeText ?? 'Home Page Ad Banner'}`}
              src={`${NEXT_PUBLIC_ASSETS_URL}${homeAdsData?.data?.attributes?.damacAd?.data?.attributes?.url || ''}`}
              className='my-8'
            />
          </Link>
        )}
      </div>
    </div>
  );
}
