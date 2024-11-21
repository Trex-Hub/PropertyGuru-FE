'use client';
import { ResponseStatusEnum } from '@/models/common';
import { getHomePageAds } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import logger from '@/utils/logger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HomeAdsData = any;

export default function HomePageMobileAdBanner() {
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
    <div className='flex justify-center'>
      <div className='flex justify-center items-center'>
        {homeAdsData && (
          <Link
            href={homeAdsData?.data?.attributes?.adLink}
            target='_blank'
            rel='noopener noreferrer'>
            <Image
              width={300}
              height={250}
              alt={`${homeAdsData?.data?.attributes?.damacMobileAd?.data?.attributes?.alternativeText ?? 'Home Page Mobile Ad Banner'}`}
              src={`${NEXT_PUBLIC_ASSETS_URL}${homeAdsData?.data?.attributes?.damacMobileAd?.data?.attributes?.url || ''}`}
              className='my-8'
            />
          </Link>
        )}
      </div>
    </div>
  );
}
