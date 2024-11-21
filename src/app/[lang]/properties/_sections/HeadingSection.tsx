import { ResponseStatusEnum } from '@/models/common';
import { getPropertyDetails } from '@/services/properties';
import { toLowerCase } from '@/utils/utilities';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default async function HeadingSection({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(params.slug);
  if (
    propertyDetailsStatus !== ResponseStatusEnum.SUCCESS ||
    !propertyDetailsData?.data?.length
  ) {
    return (
      <div className='py-4 font-bold'>
        The property you are looking for is not registered with us.
      </div>
    );
  }
  const { propertyType, title } = propertyDetailsData.data[0].attributes;
  return (
    <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 gap-[0.35rem]'>
      <Link href='/'>
        <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
          Home
        </p>
      </Link>
      <FiChevronRight className='text-primary-textGrayColor' />
      <Link href={`/${params.lang}/listings/${toLowerCase(propertyType)}`}>
        <p className='text-[0.625rem] md:text-xs text-primary-secondaryTextColor'>
          {propertyType}
        </p>
      </Link>
      <FiChevronRight className='text-primary-textGrayColor' />
      <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
        {title}
      </p>
    </div>
  );
}
