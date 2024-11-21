'use client';
import { TopDevelopersLoading } from '@/components/Loading';
import { Developers } from '@/models/developer';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import Image from 'next/image';
import React, { Suspense } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function TopDevelopersClient({ developersData }: any) {
  const developers = developersData?.data;
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <div className=''>
      <div className='flex flex-col justify-center items-center my-5 md:my-16'>
        <p className='font-secondary text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor text-center'>
          Our Top Partners
        </p>
        <p className='text-base font-primary text-primary-iconColor mt-3 text-center px-5 md:px-10'>
          If you have properties for sale based on their plans, showcase them in
          your homepage to attract investors.
        </p>
        <div className='flex flex-wrap items-center justify-center px-10 gap-12 md:gap-14 my-12'>
          <Suspense fallback={<TopDevelopersLoading />}>
            <Carousel
              opts={{
                align: 'start',
              }}
              plugins={[plugin.current]}
              className='w-full xl:max-w-7xl lg:max-w-4xl md:max-w-2xl max-w-2xl mx-auto flex items-center gap-4 justify-center h-[7rem]'>
              {' '}
              <CarouselContent className='flex gap-2'>
                {' '}
                {developers?.map((developer: Developers) => (
                  <CarouselItem
                    key={developer.id}
                    className='xl:basis-1/5 lg:basis-1/3  md:basis-1/3 basis-full flex items-center justify-center'>
                    {' '}
                    <div className='p-1 md:w-[12.5rem] h-full items-center justify-center flex w-full'>
                      <Image
                        width={190}
                        height={23}
                        alt={`${developer.attributes.logo.data?.attributes?.alternativeText ?? 'Top Developers'}`}
                        src={`${NEXT_PUBLIC_ASSETS_URL}${developer.attributes.logo.data?.attributes?.url || ''}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className='hidden md:block'>
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
