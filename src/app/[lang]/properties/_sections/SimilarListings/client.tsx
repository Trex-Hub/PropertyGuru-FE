'use client';
import ListCard from '@/components/ListCard';
import { Property } from '@/models/property';
import { useCallback } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import {
  ROUTE_OPTIONS,
  SIMILAR_PROPERTIES_PRICE_RANGE,
} from '@/utils/constants';

interface SimilarListingsClientProps {
  propertyDetails: any;
  similarProperties: Property[];
  params: {
    slug: string;
    lang: string;
  };
}

const SimilarListingsClient = ({
  propertyDetails,
  similarProperties,
  params,
}: SimilarListingsClientProps) => {
  const router = useRouter();
  const { location, propertyType, price } = propertyDetails.data[0].attributes;
  const minPrice = parseFloat(price) - SIMILAR_PROPERTIES_PRICE_RANGE;
  const maxPrice = parseFloat(price) + SIMILAR_PROPERTIES_PRICE_RANGE;

  const navigateToAdvancedSearch = useCallback(
    (minPrice: number, maxPrice: number, city: string, propertyType: string) =>
      () => {
        router.push(
          `/en/${ROUTE_OPTIONS.ADVANCED_SEARCH}?propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}&city=${city}`
        );
      },
    [router]
  );
  if (similarProperties.length === 0) {
    return null;
  }
  return (
    <div className='px-2 md:px-[6rem] h-full py-[3.625rem] bg-primary-similarlistingbg w-full text-primary-textColor items-center justify-center'>
      <div className='flex justify-between items-center'>
        <p className='text-xl leading-[1.25rem] font-bold p-2 font-secondary'>
          You may also like
        </p>
        <div
          className='flex gap-1 text-primary-loginTextColor text-sm font-primary items-center mr-10 cursor-pointer'
          onClick={navigateToAdvancedSearch(
            minPrice,
            maxPrice,
            location.city,
            propertyType
          )}
          onKeyDown={navigateToAdvancedSearch(
            minPrice,
            maxPrice,
            location.city,
            propertyType
          )}
          tabIndex={0}
          role='button'>
          <p className='font-semibold'>See All</p>
          <FaChevronRight />
        </div>
      </div>
      <div className='mt-6'>
        <div className='hidden md:flex md:gap-5 lg:flex lg:justify-evenly w-full overflow-x-auto h-[32.5rem]'>
          {similarProperties.slice(0, 3).map((property: Property) => (
            <ListCard key={property.id} property={property} params={params} />
          ))}
        </div>
        <div className='flex md:hidden overflow-x-auto gap-5'>
          {similarProperties.slice(0, 3).map((property: Property) => (
            <ListCard property={property} key={property.id} params={params} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarListingsClient;
