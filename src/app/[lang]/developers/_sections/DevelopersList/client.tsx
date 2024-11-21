'use client';
import DeveloperListCard from '@/components/DeveloperListCard';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import { cn } from '@/lib/utils';
import { Developers } from '@/models/developer';
import { DEVELOPERS_PER_PAGE, INITIAL_PAGE } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

type AllDevelopersParams = {
  searchParams: {
    page: string;
  };
  allDevelopers: {
    data: Developers[];
    meta: {
      pagination: {
        total: number;
      };
    };
  };
  params: {
    lang: string;
  };
};
export default function DevelopersListClient({
  searchParams,
  allDevelopers,
  params,
}: AllDevelopersParams) {
  const router = useRouter();
  const developerList = useMemo(
    () => allDevelopers?.data || [],
    [allDevelopers]
  );
  const page = Number(searchParams.page) || INITIAL_PAGE;
  const totalPages = Math.ceil(
    allDevelopers?.meta?.pagination?.total / DEVELOPERS_PER_PAGE
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
  // Update visible pages based on the current page and total pages
  const getVisiblePages = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxVisible = 8;
    const start = Math.max(0, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible);

    return pages.slice(start, end);
  };

  const visiblePagesList = getVisiblePages();
  return (
    <div className='flex flex-col font-primary justify-between gap-10'>
      <h1 className='text-base font-bold lg:text-[2rem] text-primary-primaryTextColor lg:font-bold font-secondary mt-5'>
        Our Top Developers
      </h1>
      <div className='flex  w-full'>
        <div className='hidden lg:flex lg:overflow-x-auto lg:whitespace-nowrap lg:space-x-8'>
          <div className='mb-5 flex flex-wrap gap-8 items-center'>
            {developerList && developerList.length > 0 ? (
              <div className='grid gap-8 flex-shrink-0'>
                <div className='hidden md:grid grid-cols-1 xl:grid-cols-2 gap-8'>
                  {developerList.map((developer: Developers) => (
                    <React.Fragment key={developer.id}>
                      <div className='flex-shrink-0'>
                        <DeveloperListCard
                          developer={developer}
                          params={params}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <p className='text-2xl font-bold text-primary-primaryTextColor m-10'>
                No data available
              </p>
            )}
          </div>
        </div>
        <div className='flex lg:hidden mb-2 justify-center items-center'>
          {developerList && developerList.length > 0 ? (
            <div className='grid gap-8'>
              <div className='flex flex-col gap-5 items-center'>
                {developerList.map((developer: Developers, index: number) => (
                  <div
                    key={developer.id}
                    className='w-full flex flex-col items-center'>
                    <DeveloperListCard developer={developer} params={params} />

                    {developerList.length > 2 && index === 1 && (
                      <div className='w-full flex justify-center items-center'></div>
                    )}
                    {developerList.length > 2 && index === 4 && (
                      <div className='m-5'>
                        <div className='gap-5 flex flex-col'>
                          <PropertyDetailForm />
                          <PropertyDetailFormButton />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {developerList.length <= 2 && (
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
