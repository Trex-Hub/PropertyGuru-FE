'use client';
import ShareButton from '@/components/ShareButton';
import { Button } from '@/components/ui/button';
import { PropertyData } from '@/models/property';
import { FormEvent, useCallback } from 'react';
import { CiLocationOn } from 'react-icons/ci';

const TopLabelClient = ({
  propertyDetails,
}: {
  propertyDetails: PropertyData | undefined;
}) => {
  const attributes = propertyDetails?.data[0]?.attributes;
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

  return (
    <div className='md:flex justify-between p-2 py-4 md:p-4'>
      <div>
        <h1 className='text-[1.5rem] md:text-[2rem] leading-[1.75rem] md:leading-[2.5rem] font-bold font-secondary text-primary-titleTextColor'>
          {attributes?.title}
        </h1>
        <div className='flex items-center my-2 font-[400]'>
          <div className='text-2xl text-primary-dropdownIconColor'>
            <CiLocationOn />
          </div>
          <p className='font-primary text-[0.875rem] leading-[1.435rem] text-primary-textColor'>
            {attributes?.location?.area}, {attributes?.location?.city}
          </p>
        </div>
      </div>
      <div className='flex justify-between gap-3 items-top max-h-[2.875rem]'>
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

        <div className='inline-flex justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground px-4 py-2 items-center h-full text-2xl md:text-3xl bg-transparent hover:bg-transparent'>
          <div className='text-primary-secondaryTextColor font-bold'>
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLabelClient;
