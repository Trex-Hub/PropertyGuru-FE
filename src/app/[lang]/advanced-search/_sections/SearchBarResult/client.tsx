'use client';
import React, { useCallback, useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import { MdFilterList } from 'react-icons/md';
import { SlGrid } from 'react-icons/sl';
import { CiGrid2H } from 'react-icons/ci';
import { GoSortDesc } from 'react-icons/go';
import HorizontalListCard from '@/components/HorizontalListCard';
import ListCard from '@/components/ListCard';
import { Property, SortOption } from '@/models/property';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import {
  SEARCH_PROPERTIES_ITEMS_PER_PAGE,
  INITIAL_PAGE,
  SORT_BY_OPTIONS,
} from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { ellipsisText } from '@/utils/utilities';
import { RxCrossCircled } from 'react-icons/rx';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import AdContainer from '@/components/AdContainer';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import MoreFilterPopup from '../MoreFilterPopup';
import useScrollLock from '@/hooks/useScrollLock';
import KeywordSearch from '../../_components/KeywordSearch';

type AllPropertiesParams = {
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
  allProperties: {
    data: Property[];
    meta: {
      pagination: {
        total: number;
      };
    };
  };
  params: {
    lang: string;
    category: string;
  };
};

export default function SearchBarResultClient({
  searchParams,
  allProperties,
  params,
}: AllPropertiesParams) {
  const [activeCard, setActiveCard] = useState('vertical');
  const propertyList = useMemo(
    () => allProperties?.data || [],
    [allProperties]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOption | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const page = Number(searchParams.page) || INITIAL_PAGE;

  const totalPages = Math.ceil(
    allProperties?.meta?.pagination?.total / SEARCH_PROPERTIES_ITEMS_PER_PAGE
  );

  const handleSetActiveCard = useCallback(
    (cardType: string) => () => {
      setActiveCard(cardType);
    },
    []
  );

  const handleButtonClick = useCallback(
    (page: number) => () => {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('page', String(page));
      router.replace(currentUrl.toString());
    },
    [router]
  );
  const handlePrevClick = useCallback(() => {
    if (page > 1) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('page', String(page - 1));
      router.replace(currentUrl.toString());
    }
  }, [page, router]);

  const handleNextClick = useCallback(() => {
    if (page < totalPages) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('page', String(page + 1));
      router.replace(currentUrl.toString());
    }
  }, [page, totalPages, router]);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, []);
  useScrollLock(isModalOpen);
  const handleSortChange = useCallback(
    (option: SortOption) => () => {
      setSelectedSortOption(option);

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('sort', option.value);
      router.push(currentUrl.toString());
    },
    [router]
  );

  const handleKeywordChange = useCallback(
    (keyword: string) => {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('keyword', keyword);
      router.push(currentUrl.toString());
    },
    [router]
  );

  const clearSelectedSortOption = useCallback(() => {
    setSelectedSortOption(null);
  }, []);

  const selectedOptionText = selectedSortOption?.value || 'Relevance';
  const ellipsedText = ellipsisText(selectedOptionText as string);

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
  }, []);

  const handleTriggerClick = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  // Update visible pages based on the current page and total pages
  const getVisiblePages = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxVisible = 8;
    const start = Math.max(0, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible);

    return pages.slice(start, end);
  };

  const handleDebounceFunction = useCallback(
    (keyword: string) => {
      handleKeywordChange(keyword);
    },
    [handleKeywordChange]
  );
  const visiblePagesList = getVisiblePages();
  return (
    <div className='lg:w-3/4 md:p-4 px-2 overflow-y-auto w-full md:pt-0'>
      <div className='flex font-primary gap-3'>
        {/* Filter Section.tsx contains the component to be used here. Removed  */}
        <div className='flex md:hidden justify-between md:justify-end items-center md:gap-6 flex-end w-full gap-2'>
          <button
            className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[9.063rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-textColor flex items-center justify-between shadow-md lg:w-[14.188rem] lg:h-[2.75rem]'
            onClick={toggleModal}>
            <MdFilterList className='text-primary pointer-events-none text-primary-textColor' />
            More Filters
            <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
          </button>
          <MoreFilterPopup
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            searchParams={searchParams}
          />
          <DropdownMenu>
            <div className='relative'>
              <DropdownMenuTrigger asChild>
                <button className='appearance-none text-xs md:text-base lg:w-[14.188rem] lg:h-[2.75rem] border border-primary-dropdownIconColor rounded-xl px-4 focus:outline-none text-primary-dropdownIconColor flex items-center justify-between w-[12 rem] h-[2.5rem] '>
                  <GoSortDesc className='text-primary pointer-events-none text-primary-dropdownIconColor text-2xl' />
                  <div className='flex items-center justify-between w-full'>
                    <span>
                      {selectedSortOption?.value || 'Sort by: relevance'}
                    </span>
                    {selectedSortOption && (
                      <RxCrossCircled
                        className='text-primary pointer-events-auto text-primary-crossIconColor cursor-pointer'
                        onClick={clearSelectedSortOption}
                      />
                    )}
                  </div>
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg lg:w-[14.188rem]'>
                {SORT_BY_OPTIONS.map(option => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={handleSortChange(option)}
                    className='px-4 py-2 text-primary-primaryTextColor text-base font-medium hover:bg-primary-dropdownHoverColor cursor-pointer'>
                    {option.value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        </div>
      </div>
      <div className='flex justify-center items-center md:hidden py-2'>
        <AdContainer
          slotId='div-gpt-ad-1727178570220-0'
          slotName='/22718860182/pg-mob-leaderboard'
          minWidth='300'
          minHeight='250'
        />
      </div>
      <div className='flex flex-wrap gap-y-4 my-4 md:mt-3 lg:mt-11 font-primary justify-between items-center'>
        <div className='flex flex-row justify-between items-center w-full'>
          <div>
            <h1 className='text-sm  w-full font-semibold lg:text-lg xl:text-2xl text-primary-primaryTextColor lg:font-bold'>
              Showing {allProperties?.meta?.pagination?.total} properties
            </h1>
          </div>
          <div className='hidden md:flex flex-row justify-end items-center gap-1 xl:gap-4'>
            <button
              className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[9.063rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-textColor flex items-center justify-between shadow-md lg:w-[9.188rem] xl:w-[14.188rem] lg:h-[2.75rem]'
              onClick={toggleModal}>
              <MdFilterList className='text-primary pointer-events-none text-primary-textColor' />
              More Filters
              <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
            </button>
            <MoreFilterPopup
              isOpen={isModalOpen}
              toggleModal={toggleModal}
              searchParams={searchParams}
            />
            <DropdownMenu>
              <div className='relative'>
                <DropdownMenuTrigger asChild>
                  <button className='appearance-none text-xs md:text-base lg:w-[12.188rem] lg:h-[2.75rem] border border-primary-dropdownIconColor rounded-xl px-4 focus:outline-none text-primary-dropdownIconColor flex items-center justify-between w-[12 rem] h-[2.5rem] '>
                    <GoSortDesc className='text-primary pointer-events-none text-primary-dropdownIconColor text-2xl' />
                    <div className='flex items-center justify-between w-full'>
                      <span>
                        {selectedSortOption?.value || 'Sort by: relevance'}
                      </span>
                      {selectedSortOption && (
                        <RxCrossCircled
                          className='text-primary pointer-events-auto text-primary-crossIconColor cursor-pointer'
                          onClick={clearSelectedSortOption}
                        />
                      )}
                    </div>
                    <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg lg:w-[14.188rem]'>
                  {SORT_BY_OPTIONS.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={handleSortChange(option)}
                      className='px-4 py-2 text-primary-primaryTextColor text-base font-medium hover:bg-primary-dropdownHoverColor cursor-pointer'>
                      {option.value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>
        </div>
        <div className='flex w-full justify-between items-center overflow-x-auto'>
          <div className='lg:w-80 w-56 '>
            <KeywordSearch debounceFunction={handleDebounceFunction} />
          </div>
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
          <div className='hidden'>
            <DropdownMenu open={open} onOpenChange={handleOpenChange}>
              <div className='relative'>
                <DropdownMenuTrigger
                  asChild
                  onPointerDown={handlePointerDown}
                  onClick={handleTriggerClick}>
                  <button className='appearance-none text-xs w-[6.75rem] h-[2.25rem] border border-primary-dropdownIconColor rounded-xl p-2 focus:outline-none text-primary-dropdownIconColor flex items-center justify-between'>
                    <GoSortDesc className='text-primary pointer-events-none text-xl text-primary-dropdownIconColor' />
                    <div className='flex items-center justify-between w-full'>
                      <span>{ellipsedText}</span>
                      {selectedSortOption && (
                        <RxCrossCircled
                          className='text-primary pointer-events-auto text-primary-crossIconColor cursor-pointer'
                          onClick={clearSelectedSortOption}
                        />
                      )}
                    </div>
                    <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-[9.75rem] mr-2'>
                  {SORT_BY_OPTIONS.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={handleSortChange(option)}
                      className='px-4 py-2 text-primary-primaryTextColor text-base font-medium hover:bg-primary-dropdownHoverColor cursor-pointer'>
                      {option.value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-full'>
        <div className='hidden lg:flex lg:overflow-x-auto lg:whitespace-nowrap lg:space-x-8'>
          {activeCard === 'vertical' && (
            <div className='mb-5 flex flex-wrap gap-8'>
              {propertyList && propertyList.length > 0 ? (
                <div className='grid gap-8 flex-shrink-0'>
                  <div className='hidden md:grid grid-cols-1 xl:grid-cols-2 gap-x-8'>
                    {propertyList.map((property: Property, index: number) => (
                      <React.Fragment key={property.id}>
                        <div className='flex-shrink-0 py-6'>
                          <ListCard property={property} params={params} />
                        </div>
                        {propertyList.length > 2 && index === 1 && (
                          <div className='col-span-full mt-5 w-full flex justify-center'>
                            <AdContainer
                              slotId='div-gpt-ad-1722271431245-0'
                              slotName='/22718860182/pg-homepage-content1'
                              minWidth='728'
                              minHeight='90'
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  {propertyList.length <= 2 && (
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
              {propertyList && propertyList?.length > 0 ? (
                <div className='grid gap-8 flex-shrink-0'>
                  <div className='flex flex-col gap-6'>
                    {propertyList.map((property: Property, index: number) => (
                      <div key={property.id} className='flex-shrink-0'>
                        <HorizontalListCard
                          property={property}
                          params={params}
                        />
                        {propertyList.length > 2 && index === 1 && (
                          <div className='w-full mt-4 flex justify-center items-center'>
                            <AdContainer
                              slotId='div-gpt-ad-1722271431245-0'
                              slotName='/22718860182/pg-homepage-content1'
                              minWidth='728'
                              minHeight='90'
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {propertyList.length <= 2 && (
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
          {propertyList && propertyList.length > 0 ? (
            <div className='grid gap-8'>
              <div className='flex flex-col gap-5 items-center'>
                {propertyList.map((property: Property, index: number) => (
                  <div
                    key={property.id}
                    className='w-full flex flex-col items-center'>
                    <ListCard property={property} params={params} />

                    {propertyList.length > 2 && index === 1 && (
                      <div className='w-full flex justify-center items-center'></div>
                    )}
                    {propertyList.length > 2 && index === 4 && (
                      <div className='m-5'>
                        <div className='gap-5 flex flex-col'>
                          <PropertyDetailForm />
                          <PropertyDetailFormButton />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {propertyList.length <= 2 && (
                  <>
                    <div className='w-full flex justify-center items-center m-5'></div>
                    <div className='gap-5 flex flex-col'>
                      <PropertyDetailForm />
                      <PropertyDetailFormButton />
                    </div>
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
    </div>
  );
}
