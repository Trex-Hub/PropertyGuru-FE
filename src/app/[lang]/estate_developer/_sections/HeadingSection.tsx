import { ResponseStatusEnum } from '@/models/common';
import { getDeveloperDetails } from '@/services/developers';
import { ROUTE_OPTIONS } from '@/utils/constants';
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
  const { data: developerDetailsData, status: developerDetailsStatus } =
    await getDeveloperDetails(params.slug);
  if (
    developerDetailsStatus !== ResponseStatusEnum.SUCCESS ||
    !developerDetailsData?.data?.length
  ) {
    return <div>Error fetching developer details</div>;
  }
  const { title } = developerDetailsData.data[0].attributes;
  return (
    <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 gap-[0.35rem]'>
      <Link href='/'>
        <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
          Home
        </p>
      </Link>
      <FiChevronRight className='text-primary-textGrayColor' />
      <Link href={`/${params.lang}/${ROUTE_OPTIONS.DEVELOPERS}`}>
        <p className='text-[0.625rem] md:text-xs text-primary-secondaryTextColor'>
          Our Top Developers
        </p>
      </Link>
      <FiChevronRight className='text-primary-textGrayColor' />
      <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
        {title}
      </p>
    </div>
  );
}
