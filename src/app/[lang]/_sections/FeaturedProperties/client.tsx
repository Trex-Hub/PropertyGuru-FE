'use client';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { FEATURED_PROPERTIES_ITEMS_PER_PAGE, OPTIONS } from '@/utils/constants';
import ListCard from '../../../../components/ListCard';
import { Button } from '@/components/ui/button';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { getFeaturedProperties } from '@/services/properties';
import { Property } from '@/models/property';
import Link from 'next/link';
import { ResponseStatusEnum } from '@/models/common';
import { GoogleAdVideoLoader, ListCardLoading } from '@/components/Loading';
import logger from '@/utils/logger';
import InsightsCarousel from '@/components/InsightsCarousel';
import GoogleAdVideo from '@/components/GoogleAdVideo';

type FeaturedPropertiesParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };
  featuredProperties: Property[];
  params: {
    lang: string;
  };
};

export default function FeaturedPropertiesClient({
  searchParams,
  featuredProperties,
  params,
}: FeaturedPropertiesParams) {
  const featuredPropertyType = searchParams.featuredPropertyType;
  const [properties, setProperties] = useState<Property[]>(
    featuredProperties || []
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadProperties = useCallback(async (start = 0) => {
    setLoading(true);
    const { data: propertyData, status } = await getFeaturedProperties(
      featuredPropertyType,
      start,
      FEATURED_PROPERTIES_ITEMS_PER_PAGE
    );
    if (
      status === ResponseStatusEnum.SUCCESS &&
      propertyData?.data?.length > 0
    ) {
      setProperties(prev => [...prev, ...propertyData.data]);
      setHasMore(
        propertyData.data.length === FEATURED_PROPERTIES_ITEMS_PER_PAGE
      );
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (featuredProperties) {
      setProperties(featuredProperties);
    }
  }, [featuredProperties]);

  const handleSeeMore = useCallback(async () => {
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await loadProperties(nextPage * FEATURED_PROPERTIES_ITEMS_PER_PAGE);
    } catch (error) {
      logger.error('Error loading properties:', error);
    }
  }, [currentPage]);

  return (
    <div className='flex flex-col justify-center items-center bg-primary-iconBackgroundColor '>
      <p className='font-teriary text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor  mt-[3.5rem]'>
        Our Featured Properties
      </p>
      <div className='flex justify-center items-center flex-wrap gap-2 mt-3 md:mt-[2.2rem] mb-2 px-2'>
        {OPTIONS.map(option => (
          <Link
            href={
              option.name === 'All'
                ? `/${params.lang}`
                : `/${params.lang}?featuredPropertyType=${option.url}`
            }
            key={option.name}
            scroll={false}
            className={`cursor-pointer border rounded-[6.25rem] px-4 py-2 transition-colors duration-200 ${
              (!featuredPropertyType && option.name === 'All') ||
              featuredPropertyType === option.url
                ? 'border-primary-textColor text-primary-textColor'
                : 'border-primary-dropdownIconColor text-primary-dropdownIconColor'
            } hover:border-primary-textColor hover:text-primary-textColor`}>
            <p className='md:text-base text-xs'>{option.name}</p>
          </Link>
        ))}
      </div>
      <div className='mb-2'>
        <div className='grid gap-8 p-5'>
          {/* Large screens */}
          <div className='hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
            {properties.map((property: Property, index: number) => (
              <Suspense key={property.id} fallback={<ListCardLoading />}>
                <div className='py-2'>
                  <ListCard property={property} params={params} />
                </div>
                {properties.length > 2 && index === 1 && (
                  <div className='flex items-center justify-center flex-col gap-4 shadow-lg p-2'>
                    <Suspense fallback={<GoogleAdVideoLoader />}>
                      <GoogleAdVideo />
                    </Suspense>
                    <InsightsCarousel />
                  </div>
                )}
              </Suspense>
            ))}

            {properties.length <= 2 && (
              <div className='flex flex-col items-center justify-center'>
                <Suspense fallback={<GoogleAdVideoLoader />}>
                  <GoogleAdVideo />
                </Suspense>
                <InsightsCarousel />
              </div>
            )}
          </div>
          {/* Small screens */}
          <div className='flex md:hidden overflow-x-auto gap-5'>
            {properties.map((property: Property) => (
              <Suspense key={property.id} fallback={<ListCardLoading />}>
                <ListCard property={property} params={params} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
      {hasMore && (
        <Button
          onClick={handleSeeMore}
          disabled={loading}
          className='w-[7rem] h-[2.25rem] md:w-[9.3125rem] md:h-[3.5rem] rounded-xl bg-primary-labelColor text-primary-whiteTextColor text-sm md:text-lg font-semibold font-primary flex mb-16 hover:bg-primary-labelColor gap-1'>
          {loading ? 'Loading...' : 'See More'}
          <IoArrowForwardOutline />
        </Button>
      )}
    </div>
  );
}
