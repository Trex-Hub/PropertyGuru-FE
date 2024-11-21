import { ResponseStatusEnum } from '@/models/common';
import { Property } from '@/models/property';
import { getFeaturedProperties } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { formatPriceWithCommas } from '@/utils/utilities';
import Image from 'next/image';

export default async function SectionFeaturedProperties() {
  const { status, data } = await getFeaturedProperties();
  if (status !== ResponseStatusEnum.SUCCESS) {
    return null;
  }
  const featuredProperties = data.data || [];
  return (
    <div className='flex bg-primary-featuredPropertiesBackgroundColor rounded-[0.313rem]'>
      <div className='flex flex-col p-6 gap-6 w-full'>
        <p className='text-base font-semibold font-secondary text-primary-textColor'>
          Featured Properties
        </p>
        <div className='flex w-full'>
          <div className='hidden lg:flex lg:flex-wrap items-start justify-start flex-col gap-5 mb-5 font-primary'>
            {featuredProperties.slice(0, 4).map((property: Property) => (
              <div
                key={property.id}
                className='flex gap-5 justify-start items-center'>
                {property?.attributes?.image?.data[0]?.attributes?.url && (
                  <Image
                    src={`${NEXT_PUBLIC_ASSETS_URL}${property?.attributes?.image?.data[0]?.attributes?.url}`}
                    alt={
                      property?.attributes?.image?.data[0]?.attributes
                        ?.alternativeText ?? 'Latest Properties'
                    }
                    className='rounded-[0.313rem]'
                    width={133}
                    height={101}
                  />
                )}
                <div className='flex flex-wrap flex-col gap-1'>
                  <p className='text-sm lg:text-base font-bold text-primary-primaryTextColor'>
                    {property.attributes.title}
                  </p>
                  <div className='flex flex-wrap items-center gap-1'>
                    <p className='text-xs lg:text-base text-primary-primaryTextColor'>
                      Starting from
                    </p>
                    <p className='text-xs lg:text-xl font-bold text-primary-labelColor'>
                      {formatPriceWithCommas(property.attributes.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='lg:hidden flex items-start justify-start overflow-x-auto scrollbar-hidden w-full'>
            <div className='flex flex-nowrap gap-5 mb-5 font-primary w-full'>
              {featuredProperties.slice(0, 4).map((property: Property) => (
                <div
                  key={property.id}
                  className='flex-shrink-0 flex flex-row gap-3 items-center'>
                  {property?.attributes?.image?.data[0]?.attributes?.url && (
                    <Image
                      src={`${NEXT_PUBLIC_ASSETS_URL}${property?.attributes?.image?.data[0]?.attributes?.url}`}
                      alt={
                        property?.attributes?.image?.data[0]?.attributes
                          ?.alternativeText ?? 'Latest Properties'
                      }
                      className='rounded-[0.313rem]'
                      width={133}
                      height={101}
                    />
                  )}
                  <div className='flex flex-col gap-1'>
                    <p className='text-sm lg:text-base font-bold text-primary-primaryTextColor'>
                      {property.attributes.title}
                    </p>
                    <div className='flex items-center gap-1'>
                      <p className='text-xs lg:text-base text-primary-primaryTextColor'>
                        Starting from
                      </p>
                      <p className='text-xs lg:text-xl font-bold text-primary-labelColor'>
                        {formatPriceWithCommas(property.attributes.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
