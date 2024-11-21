import Image from 'next/image';
import Carousel from '../../../../../components/Carousel';
import { PropertyData } from '@/models/property';
import { DEFAULT_MAP_LINK, NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';

const PropertyImagesClient = ({
  propertyDetails,
}: {
  propertyDetails: PropertyData | undefined;
}) => {
  const images = propertyDetails?.data[0]?.attributes?.image?.data?.map(
    img => ({
      src: NEXT_PUBLIC_ASSETS_URL + img.attributes.url,
      alt: img.attributes.alternativeText,
      idx: img.id,
    })
  ) || [{ src: '/property_2.svg', alt: 'property image', idx: 0 }];
  const featuredImage =
    propertyDetails?.data[0]?.attributes?.featuredImage?.data?.attributes;
  const featuredImageUrl = featuredImage?.url
    ? NEXT_PUBLIC_ASSETS_URL + featuredImage.url
    : '';
  const featuredImageAlt = featuredImage?.alternativeText || 'Property Image';
  const maplink = propertyDetails?.data[0]?.attributes.maplink;
  const deliveryDate = propertyDetails?.data[0]?.attributes.handover;

  return (
    <div className='flex gap-2 justify-center md:m-2 sm:h-[17rem] md:h-[29rem] md:rounded-xl overflow-hidden'>
      {/* feature image  */}
      <div className='hidden relative sm:block  w-full sm:w-[70%] h-full overflow-hidden object-fill'>
        <div className='w-full h-full'>
          {featuredImage?.url && (
            <Image
              className='w-full h-full object-cover'
              src={featuredImageUrl}
              alt={featuredImageAlt}
              width={880}
              priority
              height={205}
              quality={100}
            />
          )}
          <div className='absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white text-center flex justify-between items-center py-4 px-5'>
            <div className='border border-primary-whiteTextColor rounded-[1.25rem]'>
              <p className='text-white text-xs md:text-sm font-primary font-bold p-2 px-5'>
                Delivery Date: {deliveryDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* images and map  */}
      <div className='flex w-full mx-5 sm:mx-[unset] sm:w-[30%]   flex-col  gap-2'>
        <div className=' w-full  '>
          <Carousel images={images} />
        </div>
        <div className=' w-full    sm:aspect-video  '>
          {maplink ? (
            <iframe
              title='Map'
              width='100%'
              height='100%'
              className='w-full h-full'
              src={maplink}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              sandbox='allow-scripts'></iframe>
          ) : (
            <iframe
              title='DefaultMap'
              width='100%'
              height='100%'
              className='w-full h-full'
              src={DEFAULT_MAP_LINK}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              sandbox='allow-scripts'></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyImagesClient;
