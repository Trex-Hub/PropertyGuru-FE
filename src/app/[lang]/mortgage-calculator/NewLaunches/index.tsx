'use client';
import { useEffect, useState } from 'react';
import { OPTIONS } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { IoArrowForwardOutline } from 'react-icons/io5';
import Link from 'next/link';
// import { getNewLaunchedProperties } from '@/services/properties';
import ListCard from '@/components/ListCard';
import { Property } from '@/models/property';
// import { ResponseStatusEnum } from '@/models/common';
// import logger from '@/utils/logger';
import { useRouter } from 'next/navigation';

type NewLaunchPropertiesParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };
  newLaunchProperties: Property[];
  params: {
    lang: string;
  };
};

export default function NewLaunches({
  searchParams,
  newLaunchProperties,
  params,
}: NewLaunchPropertiesParams) {
  const launchedPropertyType = searchParams.launchedPropertyType;
  const [properties, setProperties] = useState<Property[]>(
    (newLaunchProperties || []).slice(0, 2)
  );
  // const [currentPage, setCurrentPage] = useState(0);
  // const [hasMore, setHasMore] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const loadProperties = async (start = 0) => {
  //   setLoading(true);
  //   const { data: propertyData, status } = await getNewLaunchedProperties(
  //     launchedPropertyType,
  //     start,
  //     NEW_LAUNCH_PROPERTIES_ITEMS_PER_PAGE
  //   );
  //   if (
  //     status === ResponseStatusEnum.SUCCESS &&
  //     propertyData?.data?.length > 0
  //   ) {
  //     setProperties(prev => [...prev, ...propertyData.data]);
  //     setHasMore(
  //       propertyData.data.length === NEW_LAUNCH_PROPERTIES_ITEMS_PER_PAGE
  //     );
  //   } else {
  //     setHasMore(false);
  //   }
  //   setLoading(false);
  // };
  useEffect(() => {
    if (newLaunchProperties) {
      // Only set first 2 properties when initial data changes
      setProperties(newLaunchProperties.slice(0, 2));
    }
  }, [newLaunchProperties]);

  // const handleSeeMore = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const nextPage = currentPage + 1;
  //     setCurrentPage(nextPage);
  //     await loadProperties(nextPage * NEW_LAUNCH_PROPERTIES_ITEMS_PER_PAGE);
  //   } catch (error) {
  //     logger.error('Error loading properties:', error);
  //   }
  // }, [currentPage, loadProperties]);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/${params.lang}?section=new-launches`);
  };

  return (
    <div className='flex flex-col justify-center items-center bg-primary-backgroundColor mb-20'>
      <p className='font-teriary text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor mt-[3.5rem]'>
        New Launches
      </p>
      <div className='flex gap-2 mt-3 md:mt-[2.2rem] mb-2'>
        {OPTIONS.map(option => (
          <Link
            href={
              option.name === 'All'
                ? `/${params.lang}/mortgage-calculator`
                : `/${params.lang}/mortgage-calculator?launchedPropertyType=${option.url}`
            }
            key={option.name}
            scroll={false}
            className={`cursor-pointer border rounded-[6.25rem] px-4 py-2 transition-colors duration-200 ${
              (!launchedPropertyType && option.name === 'All') ||
              launchedPropertyType === option.url
                ? 'border-primary-textColor text-primary-textColor'
                : 'border-primary-dropdownIconColor text-primary-dropdownIconColor'
            } hover:border-primary-textColor hover:text-primary-textColor`}>
            <p className='md:text-base text-xs'>{option.name}</p>
          </Link>
        ))}
      </div>
      <div className='mb-2'>
        {properties && properties.length > 0 ? (
          <div className='grid gap-2'>
            {/* Large screens */}
            <div className='hidden md:flex md:space-x-2 overflow-x-hidden h-[32.5rem]'>
              {properties.map((property: Property) => (
                <div className='h-auto' key={property.id}>
                  <ListCard
                    key={property.id}
                    property={property}
                    params={params}
                  />
                </div>
              ))}
            </div>

            {/* Small screens */}
            <div className='flex md:hidden overflow-x-scroll gap-5'>
              {properties.map((property: Property) => (
                <ListCard
                  property={property}
                  key={property.id}
                  params={params}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No properties found.</p>
        )}
      </div>
      <Button
        className='w-[7rem] h-[2.25rem] md:w-[9.3125rem] md:h-[3.5rem] rounded-xl bg-primary-labelColor text-primary-whiteTextColor text-sm md:text-lg font-semibold font-primary flex mb-16 hover:bg-primary-labelColor gap-1'
        onClick={handleClick}>
        See More
        <IoArrowForwardOutline />
      </Button>
      {/* {hasMore && (
        <Button
          onClick={handleSeeMore}
          disabled={loading}
          className='w-[7rem] h-[2.25rem] md:w-[9.3125rem] md:h-[3.5rem] rounded-xl bg-primary-labelColor text-primary-whiteTextColor text-sm md:text-lg font-semibold font-primary flex mb-16 hover:bg-primary-labelColor gap-1'>
          {loading ? 'Loading...' : 'See More'}
          <IoArrowForwardOutline />
        </Button>
      )} */}
    </div>
  );
}
