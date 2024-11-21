'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { SlGrid } from 'react-icons/sl';
import { CiGrid2H } from 'react-icons/ci';
import HorizontalListCard from '@/components/HorizontalListCard';
import ListCard from '@/components/ListCard';
import { Property } from '@/models/property';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import {
  SEARCH_PROPERTIES_ITEMS_PER_PAGE,
  INITIAL_PAGE,
} from '@/utils/constants';
import { useRouter } from 'next/navigation';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import AdContainer from '@/components/AdContainer';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import { transformWishlistData } from '../../_components/helper';
import { getWishlistProperties } from '@/services/properties';
import { getItem } from '@/utils/storageHelper';
import { ListCardLoading } from '@/components/Loading';
import { useWishListContext } from '@/contexts/WishlistContext';
type SearchBarResultProps = {
  searchParams: {
    minPrice: number;
    maxPrice: number;
    city: string;
    area: string;
    developer: string;
    propertyType: string;
    readiness: string;
    minArea: number;
    maxArea: number;
    bedroom: number | number[];
    bathroom: number | number[];
    possession: string | string[];
    amenity: string | string[];
    keyword: string;
    page: string;
    sort: string;
  };
  params: {
    lang: string;
    category: string;
  };
};

const LoadingItems = [1, 2, 3, 4].map(item => {
  return (
    <React.Fragment key={item}>
      <ListCardLoading />
    </React.Fragment>
  );
});

export default function SearchBarResultCustom({
  searchParams,
  params,
}: SearchBarResultProps) {
  const [activeCard, setActiveCard] = useState('vertical');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [page, setPage] = useState(Number(searchParams.page) || INITIAL_PAGE);
  const [allProperties, setAllProperties] = useState<{
    data: Property[];
    total: number;
  } | null>(null);
  const { wishListSlugObj } = useWishListContext();

  const fetchProperties = useCallback(async () => {
    try {
      const token = getItem('token') || '';
      const { data: wishlistPropertiesData } =
        await getWishlistProperties(token);
      setAllProperties(transformWishlistData(wishlistPropertiesData));
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties, wishListSlugObj]);

  const totalPages = Math.ceil(
    (allProperties?.total || 0) / SEARCH_PROPERTIES_ITEMS_PER_PAGE
  );

  const paginatedProperties = useMemo(() => {
    if (!allProperties) return [];
    const startIndex = (page - 1) * SEARCH_PROPERTIES_ITEMS_PER_PAGE;
    const endIndex = startIndex + SEARCH_PROPERTIES_ITEMS_PER_PAGE;
    return allProperties.data.slice(startIndex, endIndex);
  }, [allProperties, page]);

  useEffect(() => {}, [paginatedProperties]);

  const handleButtonClick = useCallback(
    (newPage: number) => () => {
      setPage(newPage);
      const currentLang = params.lang;
      router.push(`/${currentLang}/wishlist?page=${newPage}`, undefined);
    },
    [router]
  );

  const handlePrevClick = useCallback(() => {
    if (page > 1) {
      handleButtonClick(page - 1)();
    }
  }, [page, handleButtonClick]);

  const handleNextClick = useCallback(() => {
    if (page < totalPages) {
      handleButtonClick(page + 1)();
    }
  }, [page, totalPages, handleButtonClick]);

  const handleSetActiveCard = useCallback(
    (cardType: string) => () => {
      setIsLoading(true);
      setActiveCard(cardType);
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const getVisiblePages = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxVisible = 8;
    const start = Math.max(0, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible);

    return pages.slice(start, end);
  };
  const visiblePagesList = getVisiblePages();
  return (
    <div className='lg:w-3/4 md:p-4 px-2 overflow-y-auto w-full'>
      <div className='flex  my-3 lg:my-11 font-primary justify-between items-center'>
        <h1 className='text-sm font-semibold lg:text-2xl text-primary-primaryTextColor lg:font-bold'>
          {isLoading
            ? 'Favorite Properties'
            : (allProperties?.total || 0) +
              ` Favorite ${(allProperties?.total || 0) > 1 ? 'Properties' : 'Property'}`}
        </h1>
        <div className='flex'>
          <div className='hidden lg:flex lg:items-center gap-4'>
            <div className='flex space-x-4'>
              <SlGrid
                className={cn(
                  'text-xl cursor-pointer',
                  activeCard === 'vertical'
                    ? 'text-primary-labelColor'
                    : 'text-primary-secondaryTextColor hover:text-primary-labelColor'
                )}
                onClick={handleSetActiveCard('vertical')}
              />
              <CiGrid2H
                className={cn(
                  'text-2xl font-bold cursor-pointer',
                  activeCard === 'horizontal'
                    ? 'text-primary-labelColor'
                    : 'text-primary-secondaryTextColor hover:text-primary-labelColor'
                )}
                onClick={handleSetActiveCard('horizontal')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-full'>
        <div className='hidden lg:flex lg:overflow-x-auto lg:whitespace-nowrap lg:space-x-8'>
          {activeCard === 'vertical' && (
            <div className='mb-5 flex flex-wrap gap-8'>
              {(paginatedProperties && paginatedProperties.length > 0) ||
              isLoading ? (
                <div className='grid gap-8 flex-shrink-0'>
                  <div className='hidden md:grid grid-cols-1 xl:grid-cols-2 gap-x-8'>
                    {isLoading
                      ? LoadingItems
                      : paginatedProperties.map(
                          (property: Property, index: number) => (
                            <React.Fragment key={property.id}>
                              <div className='flex-shrink-0 py-8'>
                                <ListCard property={property} params={params} />
                              </div>
                              {paginatedProperties.length > 2 &&
                                index === 1 && (
                                  <div className='col-span-full w-full flex justify-center'>
                                    <AdContainer
                                      slotId='div-gpt-ad-1722271431245-0'
                                      slotName='/22718860182/pg-homepage-content1'
                                      minWidth='728'
                                      minHeight='90'
                                    />
                                  </div>
                                )}
                            </React.Fragment>
                          )
                        )}
                  </div>
                  {paginatedProperties.length <= 2 && (
                    <div className='col-span-full w-full flex justify-center'>
                      <AdContainer
                        slotId='div-gpt-ad-1722271431245-0'
                        slotName='/22718860182/pg-homepage-content1'
                        minWidth='728'
                        minHeight='90'
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className='text-2xl font-bold text-primary-primaryTextColor m-10'>
                  No data available
                </p>
              )}
            </div>
          )}
          {activeCard === 'horizontal' && (
            <div className='mb-2'>
              {(paginatedProperties && paginatedProperties.length > 0) ||
              isLoading ? (
                <div className='grid gap-8 flex-shrink-0'>
                  <div className='flex flex-col gap-6'>
                    {isLoading
                      ? LoadingItems
                      : paginatedProperties.map(
                          (property: Property, index: number) => (
                            <div key={property.id} className='flex-shrink-0'>
                              <HorizontalListCard
                                property={property}
                                params={params}
                              />
                              {paginatedProperties.length > 2 &&
                                index === 1 && (
                                  <div className='w-full flex justify-center items-center'>
                                    <AdContainer
                                      slotId='div-gpt-ad-1722271431245-0'
                                      slotName='/22718860182/pg-homepage-content1'
                                      minWidth='728'
                                      minHeight='90'
                                    />
                                  </div>
                                )}
                            </div>
                          )
                        )}
                  </div>
                  {paginatedProperties.length <= 2 && (
                    <div className='w-full flex justify-center items-center'>
                      <AdContainer
                        slotId='div-gpt-ad-1722271431245-0'
                        slotName='/22718860182/pg-homepage-content1'
                        minWidth='728'
                        minHeight='90'
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className='text-2xl font-bold text-primary-primaryTextColor m-10'>
                  No data available
                </p>
              )}
            </div>
          )}
        </div>

        <div className='flex lg:hidden mb-2 justify-center items-center'>
          {(paginatedProperties && paginatedProperties.length > 0) ||
          isLoading ? (
            <div className='grid gap-8'>
              {' '}
              <div className='flex flex-col gap-5 items-center'>
                {isLoading ? (
                  LoadingItems
                ) : (
                  <>
                    {paginatedProperties.map(
                      (property: Property, index: number) => (
                        <div
                          key={property.id}
                          className='w-full flex flex-col items-center'>
                          <ListCard property={property} params={params} />

                          {paginatedProperties.length > 2 && index === 1 && (
                            <div className='w-full flex justify-center items-center'></div>
                          )}
                          {paginatedProperties.length > 2 && index === 4 && (
                            <div className='m-5'>
                              <div className='gap-5 flex flex-col'>
                                <PropertyDetailForm />
                                <PropertyDetailFormButton />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                    {paginatedProperties.length <= 2 && (
                      <>
                        <div className='w-full flex justify-center items-center m-5'></div>
                        <div className='gap-5 flex flex-col'>
                          <PropertyDetailForm />
                          <PropertyDetailFormButton />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <p className='text-lg font-bold text-primary-primaryTextColor m-10'>
              No data available
            </p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {!!paginatedProperties.length && (
        <div className='flex justify-center items-center mt-5 mb-10 gap-7'>
          <BsChevronLeft
            className='lg:text-3xl text-base cursor-pointer'
            onClick={handlePrevClick}
          />
          <div className='overflow-x-auto whitespace-nowrap'>
            <div className='inline-flex gap-2'>
              {visiblePagesList.map(currentPage => (
                <button
                  key={currentPage}
                  className={cn(
                    'lg:px-4 lg:py-2 px-3 py-1 text-sm lg:text-base mx-1 rounded-[0.313rem]',
                    currentPage === page
                      ? 'bg-primary-labelColor text-primary-whiteTextColor'
                      : 'bg-primary-paginationButtonColor text-primary-textColor'
                  )}
                  onClick={handleButtonClick(currentPage)}>
                  {currentPage}
                </button>
              ))}
            </div>
          </div>
          <BsChevronRight
            className='lg:text-3xl text-base cursor-pointer'
            onClick={handleNextClick}
          />
        </div>
      )}
    </div>
  );
}
