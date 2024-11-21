import React, { Suspense } from 'react';
import FeaturedProperties from './_sections/FeaturedProperties';
import NewLaunches from './_sections/NewLaunches';
import TopDevelopers from './_sections/TopDevelopers';
import SearchBarContainer from './_sections/SearchBarContainer';
import FeaturedPropertiesLoading, {
  GoogleAdVideoLoader,
  NewLaunchesLoading,
  SearchBarContainerLoader,
  TopDevelopersLoader,
} from '@/components/Loading';
import AdContainer from '@/components/AdContainer';
import GoogleAdVideo from '@/components/GoogleAdVideo';

type HomePageParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };
  params: {
    lang: string;
  };
};

export default function Home({ searchParams, params }: HomePageParams) {
  return (
    <>
      <Suspense fallback={<SearchBarContainerLoader />}>
        <SearchBarContainer params={params} />
      </Suspense>
      <div className='xl:pt-10 md:pt-[22rem] lg:pt-[10rem] pt-[27.875rem]'>
        <div className='lg:flex  md:flex hidden lg:justify-center lg:items-center md:justify-center md:items-center'>
          <AdContainer
            slotId='div-gpt-ad-1722271431245-0'
            slotName='/22718860182/pg-homepage-content1'
            minWidth='728'
            minHeight='90'
          />
        </div>
        <div className='flex items-center justify-center md:hidden lg:hidden '>
          <AdContainer
            slotId='div-gpt-ad-1727175348445-0'
            slotName='/22718860182/pg-widget-right1'
            minWidth='300'
            minHeight='250'
          />
        </div>
      </div>
      <Suspense fallback={<NewLaunchesLoading />}>
        <NewLaunches searchParams={searchParams} params={params} />
      </Suspense>
      <Suspense fallback={<FeaturedPropertiesLoading />}>
        <FeaturedProperties searchParams={searchParams} params={params} />
      </Suspense>
      <Suspense fallback={<TopDevelopersLoader />}>
        <TopDevelopers />
      </Suspense>
      <div className='lg:flex  md:flex hidden lg:justify-center lg:items-center md:justify-center md:items-center'>
        <AdContainer
          slotId='div-gpt-ad-1722319824918-0'
          slotName='/22718860182/pg-homepage-content2'
          minWidth='728'
          minHeight='90'
          backgroundColor='bg-primary-bannerBackgroundColor'
        />
      </div>
      <div className='flex justify-center items-center md:hidden lg:hidden'>
        <Suspense fallback={<GoogleAdVideoLoader />}>
          <GoogleAdVideo />
        </Suspense>
      </div>
    </>
  );
}
