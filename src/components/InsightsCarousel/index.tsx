'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { insightsData } from '@/utils/constants';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

export default function InsightsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      className='w-full max-w-xs'
      opts={{
        align: 'start',
      }}
      plugins={[plugin.current]}>
      <CarouselContent>
        {insightsData.map((insight: any) => (
          <CarouselItem key={insight.id}>
            <div className='pl-10'>
              <div className='bg-primary-backgroundColor border-2 border-primary-enquiryFormBorderColor w-[14rem] rounded-[0.625rem]'>
                <div className='flex flex-col px-3 py-4 justify-center items-center'>
                  <p className='text-base font-bold'>{insight.title}</p>
                  <p className='text-base text-center'>{insight.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
