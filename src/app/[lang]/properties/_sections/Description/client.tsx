'use client';
import HtmlContent from '@/components/HtmlContent';
import { Button } from '@/components/ui/button';
import { PropertyData } from '@/models/property';
import { convertDescriptionToHtml } from '@/utils/utilities';
import { useCallback } from 'react';

const DescriptionClient = ({
  propertyDetails,
}: {
  propertyDetails: PropertyData | undefined;
}) => {
  const attributes = propertyDetails?.data[0]?.attributes;
  const handleClick = useCallback((e: any) => {
    e.preventDefault();
    document
      ?.getElementById('payment-plan')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const descriptionHtml = convertDescriptionToHtml(attributes?.description);
  return (
    <div className='p-6 pt-7'>
      <h2 className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
        Description
      </h2>
      <div className='font-primary flex flex-col text-primary-iconColor gap-3 mt-5 text-[1rem] md:font-[400] leading-[1.5rem] list-disc mr-5'>
        <HtmlContent stripeStype>{descriptionHtml}</HtmlContent>
        <Button
          className='hover:bg-[white] w-[7.75rem] text-[0.875rem]  rounded-lg px-4 hover:text-primary-labelColor hover:border hover:border-primary-loginBorder bg-primary-labelColor '
          onClick={handleClick}>
          Payment Plan
        </Button>
      </div>
    </div>
  );
};

export default DescriptionClient;
