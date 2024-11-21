'use client';
import HtmlContent from '@/components/HtmlContent';
import { DeveloperDetailsProps } from '@/models/developer';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { convertDescriptionToHtml } from '@/utils/utilities';
import Image from 'next/image';

export default function DeveloperDetailsClient({
  developerDetails,
}: DeveloperDetailsProps) {
  const { title, logo, description } = developerDetails.data[0].attributes;
  const descriptionHtml = convertDescriptionToHtml(description);
  return (
    <div className='flex flex-col md:px-0 px-4'>
      <h1 className='text-primary-primaryTextColor font-bold font-secondary text-[1.5rem] md:text-[2rem] mb-5'>
        {title}
      </h1>
      <div className='flex w-[100%] h-[15rem] relative items-center'>
        <div className='w-[100%] h-[100%]'>
          {logo?.data?.attributes?.url && (
            <Image
              className='w-[100%] h-[100%] object-contain'
              src={`${NEXT_PUBLIC_ASSETS_URL}${logo?.data?.attributes?.url}`}
              alt={logo?.data?.attributes?.alternativeText ?? 'Property Images'}
              width={880}
              height={240}
              quality={100}
            />
          )}
        </div>
      </div>
      <div className='font-primary text-primary-titleTextColor text-base leading-6 my-10'>
        <HtmlContent stripeStype>{descriptionHtml}</HtmlContent>
      </div>
      {/* <div className='bg-primary-bannerBackgroundColor w-full my-10'>
        <div className='flex flex-col px-7 py-10 gap-3'>
          <p className='text-primary-secondaryTextColor font-bold font-primary text-xl'>
            Leave a Rating
          </p>
          <div className='flex gap-2 text-primary-secondaryTextColor  items-baseline'>
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <p className='font-bold font-primary text-xl'>4.5/5</p>
            <p className='text-sm font-primary'>(1 Review)</p>
          </div>
        </div>
      </div> */}
      <div className='border-t border-primary-loginBorder'></div>
    </div>
  );
}
