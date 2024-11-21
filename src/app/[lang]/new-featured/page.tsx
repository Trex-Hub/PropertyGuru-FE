import { Suspense } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import FeaturedPropertiesLoading, {
  FeaturedPropertiesLoader,
  GoogleAdVideoLoader,
} from '@/components/Loading';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import { ResponseStatusEnum } from '@/models/common';
import { getFeaturedProperties } from '@/services/properties';
import { INITIAL_PROPERTIES_ITEMS_PER_PAGE } from '@/utils/constants';
import FeaturedProperties from './FeaturedProperties';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import AdContainer from '@/components/AdContainer';

export const metadata = {
  title: 'New Featured Properties - Propertyguru.ae | Buy Properties in Dubai',
  description: 'Not Specified',
  robots: {
    index: false,
    follow: false,
  },
};

type HomePageParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };
  params: {
    lang: string;
  };
};

export default async function PropertyList({
  searchParams,
  params,
}: HomePageParams) {
  const { data: featuredPropertiesData, status: featuredPropertiesStatus } =
    await getFeaturedProperties(
      searchParams.featuredPropertyType,
      0,
      INITIAL_PROPERTIES_ITEMS_PER_PAGE
    );
  return (
    <div className='md:px-20 px-0'>
      <div className='lg:flex  md:flex hidden lg:justify-center lg:items-center md:justify-center md:items-center'>
        <AdContainer
          slotId='div-gpt-ad-1709644694706-0'
          slotName='/22718860182/pg-mortgage-720x90'
          minWidth='728'
          minHeight='90'
          backgroundColor='bg-[#eeeeee]'
        />
      </div>
      <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
        <Link href='/'>
          <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
            Home
          </p>
        </Link>
        <FiChevronRight className='text-primary-textGrayColor' />
        <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
          New Featured Properties
        </p>
      </div>
      <div className='flex justify-center items-center md:hidden py-2'>
        <AdContainer
          slotId='div-gpt-ad-1727178570220-0'
          slotName='/22718860182/pg-mob-leaderboard'
          minWidth='300'
          minHeight='250'
        />
      </div>
      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2'>
        <div className='xl:w-[70%] lg:w-[60%] md:p-4 px-2 overflow-y-auto w-full'>
          <Suspense fallback={<FeaturedPropertiesLoading />}>
            {featuredPropertiesStatus === ResponseStatusEnum.SUCCESS ? (
              <FeaturedProperties
                searchParams={searchParams}
                featuredProperties={featuredPropertiesData.data}
                params={params}
              />
            ) : null}
          </Suspense>
          <div className='flex flex-col gap-5 items-center justify-center md:hidden lg:hidden'>
            <AdContainer
              slotId='div-gpt-ad-1727175348445-0'
              slotName='/22718860182/pg-widget-right1'
              minWidth='300'
              minHeight='250'
            />
            <Suspense fallback={<GoogleAdVideoLoader />}>
              <GoogleAdVideo />
            </Suspense>
          </div>
        </div>
        <div className='xl:w-[30%] lg:w-[40%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 h-full'>
          <div className='gap-5 flex flex-col px-10 md:px-0'>
            <AdContainer
              slotId='div-gpt-ad-1723274488140-0'
              slotName='/22718860182/pg-mortgage-300x250'
              minWidth='300'
              minHeight='250'
            />
            <PropertyDetailForm />
            <PropertyDetailFormButton />
          </div>
          <Suspense fallback={<FeaturedPropertiesLoader />}>
            <SectionFeaturedProperties />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
