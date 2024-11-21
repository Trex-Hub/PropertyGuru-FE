import PropertyDetailForm from '@/components/PropertyDetailForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import { PropertyData } from '@/models/property';
import AdContainer from '@/components/AdContainer';
import Image from 'next/image';

const FeaturesClient = ({
  propertyDetails,
}: {
  propertyDetails: PropertyData | undefined;
}) => {
  const features = propertyDetails?.data[0]?.attributes?.features;
  return (
    <>
      <div className='p-6 pt-10'>
        <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
          Features and Amenities
        </p>
        <div className='flex gap-8 px-2 md:pl-2 py-2 md:pr-8 flex-wrap mx-1 mt-5 text-[1rem] leading-[1.5rem] font-[400] text-primary-titleTextColor'>
          {features?.map(feature => (
            <div key={feature} className='flex gap-4 items-center'>
              <div className='flex gap-3 items-center text-primary-secondaryTextColor text-[1.12rem] leading-[1.75rem]'>
                <Image
                  src='/feature_icon.jpeg'
                  alt='Feature Icon'
                  width={20}
                  height={20}
                />
                <p className='text-base text-primary-primaryTextColor'>
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col p-4 items-center justify-center lg:hidden gap-5'>
        <AdContainer
          slotId='div-gpt-ad-1722317306670-0'
          slotName='/22718860182/pg-widget-right2'
          minWidth='300'
          minHeight='250'
          backgroundColor='bg-primary-bannerBackgroundColor'
        />
        <PropertyDetailForm variant='mobile' />
        <PropertyDetailFormButton />
      </div>
    </>
  );
};

export default FeaturesClient;
