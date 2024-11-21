'use client';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyData } from '@/models/property';
import Image from 'next/image';
import { MdErrorOutline } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import ShareButton from '@/components/ShareButton';
import FloorPlanModal from '@/components/FloorPlanModal';
import { AreaSystem, NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import {
  convertSquareFeetToSquareMeters,
  formatPriceWithCommas,
  getBackgroundColorClass,
  isNumber,
} from '@/utils/utilities';
import { getItem } from '@/utils/storageHelper';
import useScrollLock from '@/hooks/useScrollLock';
import { cn } from '@/lib/utils';

const PriceCardClient = ({
  propertyDetails,
}: {
  propertyDetails: PropertyData | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = propertyDetails?.data[0]?.id;
  const attributes = propertyDetails?.data[0]?.attributes;
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(
    attributes?.floorPlan[0] || null
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    attributes?.floorPlan[0]?.id.toString() || null
  );
  const [areaText, setAreaText] = useState('N/A');
  const developer = attributes?.developer;

  const handleModalToggle = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, []);
  useScrollLock(isModalOpen);

  const handleFloorPlanSelect = (floorPlan: any) => {
    setSelectedFloorPlan(floorPlan);
    setSelectedPlanId(floorPlan.id);
    setIsModalOpen(false);
  };

  const handleClick = useCallback((e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    document
      ?.getElementById('enquire-now')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const handleMobileClick = useCallback((e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    document
      ?.getElementById('enquire-now-mobile')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const price = selectedFloorPlan?.price;
  const priceDisplay = isNumber(Number(price))
    ? formatPriceWithCommas(Number(price))
    : price;

  useEffect(() => {
    const areaSystem = getItem('areaSystem');
    if (areaSystem === AreaSystem.SQUARE_METRES) {
      setAreaText(
        selectedFloorPlan?.area !== undefined
          ? `${convertSquareFeetToSquareMeters(selectedFloorPlan.area)} m²`
          : 'N/A'
      );
    } else {
      setAreaText(
        selectedFloorPlan?.area !== undefined
          ? `${selectedFloorPlan.area} ft²`
          : 'N/A'
      );
    }
  }, [selectedFloorPlan]);

  if (!selectedFloorPlan) {
    return (
      <div className='my-3 md:m-3 shadow-md p-5 font-primary md:rounded-xl overflow-hidden'>
        <p className='text-center text-primary-iconColor text-[1rem] md:text-[1.25rem] leading-[1.5rem]'>
          Floor plan data is not available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='my-3 md:m-3 shadow-md p-5 font-primary md:rounded-xl overflow-hidden'>
        <div className='flex justify-between'>
          <div className='justify-center flex flex-col gap-3 font-primary'>
            <div className='hidden md:flex gap-2'>
              <p className='text-primary-iconColor text-[0.875rem] md:text-[1rem] leading-[1.25rem] '>
                Property Id :
              </p>
              <p className='font-semibold text-primary-radioButtonTextColor md:text-primary-textColor text-[1rem] leading-[1.25rem]'>
                {id}
              </p>
            </div>
            <div className='sm:hidden gap-2'>
              <p className='text-primary-iconColor text-[0.875rem] md:text-[1rem] leading-[1.25rem] '>
                Delivery Date :{' '}
                <span className='font-semibold text-primary-radioButtonTextColor md:text-primary-textColor text-[1rem] leading-[1.25rem]'>
                  {attributes?.handover || 'N/A'}
                </span>
              </p>
            </div>
            <div
              className={cn(
                'rounded-3xl mb-1 sm:mb-3 inline-block max-w-max',
                getBackgroundColorClass(attributes?.possessionStatus ?? '')
              )}>
              <p className='text-sm font-primary px-3 py-1'>
                {attributes?.possessionStatus}
              </p>
            </div>
          </div>

          <div className='flex flex-col items-end'>
            <p className='text-base leading-[1rem] font-bold text-primary-footerTitleColor'>
              Starting Price
            </p>
            <div className='flex gap-2 items-baseline font-bold text-primary-labelColor font-primary'>
              {isNumber(Number(selectedFloorPlan?.price)) ? (
                <>
                  <p className='text-[1.25rem] leading-[1.5rem]'>AED</p>
                  <p className='font-bold text-[2rem] md:text-[2.5rem] leading-[3.5rem]'>
                    {priceDisplay}
                  </p>
                </>
              ) : (
                <p className='text-[2rem] md:text-[2rem] leading-[3.5rem]'>
                  {priceDisplay}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='md:flex md:flex-wrap gap-3 justify-between items-center my-3 font-primary'>
          <div
            className='flex flex-wrap justify-between p-3 md:p-4 md:px-3 bg-primary-bannerBackgroundColor rounded-xl items-center md:w-[29.125rem] w-full'
            onClick={handleModalToggle}
            onKeyDown={handleModalToggle}
            tabIndex={0}
            role='button'>
            <div className='flex flex-col md:flex-row gap-3'>
              <p className='text-primary-secondaryTextColor text-[0.75rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem] font-[400]'>
                Type
              </p>
              <p className='md:bg-white font-primary text-primary-primaryTextColor md:px-3 text-[1rem] leading-[1.5rem] rounded-[0.625rem]'>
                {selectedFloorPlan.bedroom} Bedroom,{' '}
                {selectedFloorPlan.bathroom} Bathroom
              </p>
            </div>
            <div className='flex items-center border-r-1 text-primary-dropdownIconColor h-5'>
              |
            </div>
            <div className='flex flex-col md:flex-row gap-3'>
              <p className='text-primary-secondaryTextColor text-[0.75rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem] font-[400]'>
                Area
              </p>
              <p className='md:bg-white font-primary text-primary-primaryTextColor md:px-3 text-[1rem] leading-[1.5rem] rounded-[0.625rem]'>
                {areaText}
              </p>
            </div>
            <IoIosArrowDown
              className='text-primary pointer-events-none text-primary-dropdownIconColor cursor-pointer'
              onClick={handleModalToggle}
            />
          </div>
          {selectedFloorPlan.unitsAvailable <= 25 ? (
            <div className='mt-4 lg:mt-0 items-center flex bg-primary-availableBackgroundColor border border-primary-availableBorderColor rounded-3xl'>
              <p className='bg-primary-flagBackgroundColor flex gap-1 items-center rounded-xl p-1 px-2'>
                <MdErrorOutline />
                Only {selectedFloorPlan.unitsAvailable} units available
              </p>
            </div>
          ) : null}
        </div>

        <div className='flex flex-wrap justify-between items-center pt-2 font-primary'>
          <div className='flex flex-wrap gap-3 items-center'>
            <Button
              className='hidden lg:flex p-[0.5rem] md:p-[0.75rem] pl-[0.75rem] pr-[1rem] md:w-[11.625rem] md:h-full text-[0.875rem] md:text-[1rem] leading-[1.25rem] md:leading-[1.375rem] font-[600] md:font-bold font-primary hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border bg-primary-labelColor'
              onClick={handleClick}>
              Enquire Now
            </Button>

            {/* Button for screens smaller than large */}
            <Button
              className='lg:hidden p-[0.5rem] md:p-[0.75rem] pl-[0.75rem] pr-[1rem] md:w-[11.625rem] md:h-full text-[0.875rem] md:text-[1rem] leading-[1.25rem] md:leading-[1.375rem] font-[600] md:font-bold font-primary hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border bg-primary-labelColor'
              onClick={handleMobileClick}>
              Enquire Now
            </Button>
            <div className='inline-flex justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 items-center text-2xl font-bold bg-transparent hover:bg-transparent'>
              <div className='text-primary-secondaryTextColor'>
                <ShareButton />
              </div>
            </div>
          </div>
          <div className='my-5 lg:m-0'>
            {developer?.data?.attributes?.logo?.data?.attributes?.url && (
              <Image
                src={`${NEXT_PUBLIC_ASSETS_URL}${developer?.data?.attributes?.logo?.data?.attributes?.url}`}
                width={120}
                height={20}
                sizes='100vw'
                className='w-20 h-auto'
                alt={
                  developer?.data?.attributes?.logo?.data?.attributes
                    ?.alternativeText ?? 'Damac Logo'
                }
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <FloorPlanModal
          floorPlan={attributes?.floorPlan}
          handleFloorPlanSelect={handleFloorPlanSelect}
          handleModalToggle={handleModalToggle}
          selectedPlanId={selectedPlanId}
        />
      )}
    </>
  );
};

export default PriceCardClient;
