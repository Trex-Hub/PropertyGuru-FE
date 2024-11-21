'use client';
import { FormEvent, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyData } from '@/models/property';
import Image from 'next/image';
import { FaArrowsAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineBed, MdOutlineShower } from 'react-icons/md';
import FloorPlanModal from '@/components/FloorPlanModal';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import useScrollLock from '@/hooks/useScrollLock';

const FloorPlansClient = ({
  floorPlanDetails,
}: {
  floorPlanDetails: PropertyData | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(
    floorPlanDetails?.data[0]?.attributes?.floorPlan[0] || null
  );
  const floorPlan = floorPlanDetails?.data[0]?.attributes.floorPlan;

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    floorPlanDetails?.data[0]?.attributes.floorPlan[0]?.id.toString() || null
  );

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
    <div className='pt-10 flex flex-col md:flex-row'>
      <div className='md:w-1/2 p-6'>
        <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold'>
          Floor Plans
        </p>
        <div>
          {selectedFloorPlan && (
            <div className='flex flex-wrap my-4 md:mr-10 font-primary '>
              <div
                className='appearance-none bg-primary-iconBackgroundColor text-base w-full rounded-xl px-4 py-2  focus:outline-none text-primary-primaryTextColor justify-between flex items-center cursor-pointer'
                onClick={handleModalToggle}
                onKeyDown={handleModalToggle}
                tabIndex={0}
                role='button'>
                <div className='flex flex-wrap gap-2'>
                  <p className='text-base text-primary-secondaryTextColor'>
                    Type
                  </p>
                  <p className='text-base text-primary-primaryTextColor'>
                    {selectedFloorPlan.bedroom} Bedroom,{' '}
                    {selectedFloorPlan.bathroom} Bathroom
                  </p>
                </div>
                <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
              </div>
            </div>
          )}

          {selectedFloorPlan && (
            <div className='flex flex-col gap-4 font-primary'>
              <div className='flex gap-4 flex-wrap items-center'>
                <MdOutlineBed className='text-primary-secondaryTextColor' />
                <p className='text-primary-searchDropdownTextColor text-base'>
                  Bedroom
                </p>
                <p className='text-primary-primaryTextColor text-base'>
                  {selectedFloorPlan.bedroom}
                </p>
              </div>
              <div className='flex gap-4 flex-wrap items-center'>
                <MdOutlineShower className='text-primary-secondaryTextColor' />
                <p className='text-primary-searchDropdownTextColor text-base'>
                  Bathroom
                </p>
                <p className='text-primary-primaryTextColor text-base'>
                  {selectedFloorPlan.bathroom}
                </p>
              </div>
              <div className='flex gap-4 flex-wrap items-center'>
                <FaArrowsAlt className='text-primary-secondaryTextColor' />
                <p className='text-primary-searchDropdownTextColor text-base'>
                  Area
                </p>
                <p className='text-primary-primaryTextColor text-base'>
                  {selectedFloorPlan.area} ft²
                </p>
              </div>
            </div>
          )}

          <p className='mt-2 text-xs font-primary text-primary-searchDropdownTextColor px-8'>
            All types include Sundeck
          </p>

          <div className='flex flex-wrap gap-3 items-center font-primary mt-14 pl-5 mb-7'>
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
          </div>
        </div>
      </div>

      <div className='md:w-1/2 mt-2 p-0 flex items-center w-full'>
        {selectedFloorPlan?.floorImage?.data?.attributes?.url && (
          <Image
            className='w-full'
            width={428}
            height={486}
            src={`${NEXT_PUBLIC_ASSETS_URL}${selectedFloorPlan?.floorImage?.data?.attributes?.url}`}
            alt={
              selectedFloorPlan?.floorImage?.data?.attributes
                ?.alternativeText ?? 'floorplan image'
            }
          />
        )}
      </div>

      {isModalOpen && (
        <FloorPlanModal
          floorPlan={floorPlan}
          handleFloorPlanSelect={handleFloorPlanSelect}
          handleModalToggle={handleModalToggle}
          selectedPlanId={selectedPlanId}
        />
      )}
    </div>
  );
};

export default FloorPlansClient;
