'use client';
import Image from 'next/image';
import { Developers } from '@/models/developer';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { convertDescriptionToHtml, ellipsesText } from '@/utils/utilities';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import HtmlContent from '../HtmlContent';
import Link from 'next/link';

interface DeveloperListCardProps {
  developer: Developers;
  params: {
    lang: string;
  };
}

export default function DeveloperListCard({
  developer,
  params,
}: DeveloperListCardProps) {
  const { logo, title, description, slug } = developer.attributes;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = useCallback(() => {
    setLoading(true);
    const url = `/${params?.lang}/estate_developer/${slug}`;
    router.push(url);
  }, [router, slug]);
  const descriptionHtml = convertDescriptionToHtml(description);
  return (
    <div className='flex flex-col w-[20rem] md:w-[25.5rem] md:h-[32.5rem] rounded-[0.625rem] border border-primary-dropdownIconColor bg-primary-whiteTextColor  overflow-hidden'>
      <Link href={`/${params?.lang}/estate_developer/${slug}`}>
        <div className='w-[20rem] md:w-[25.5rem] h-[17.5rem] mx-auto overflow-hidden rounded-t-[0.625rem]'>
          <div className='w-full h-full flex justify-center items-center'>
            {logo?.data?.attributes?.url && (
              <Image
                width={420}
                height={280}
                alt='Developer Image'
                src={`${NEXT_PUBLIC_ASSETS_URL}${logo?.data?.attributes?.url}`}
                className='w-full h-full object-contain transition-transform duration-1000 transform group-hover:scale-105'
                style={{ objectPosition: 'center' }}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col flex-grow p-5 justify-between'>
          <div className='flex flex-col gap-2'>
            <div
              className='text-2xl font-bold font-primary text-primary-textColor'
              onClick={handleClick}
              onKeyDown={handleClick}
              tabIndex={0}
              role='button'>
              {ellipsesText(title, 30)}
            </div>
            <div className='text-base font-primary text-primary-secondaryTextColor text-wrap'>
              <HtmlContent stripeStype>
                {ellipsesText(descriptionHtml, 200)}
              </HtmlContent>
            </div>
          </div>
          <div className='flex mt-auto'>
            <Link
              href={`/${params?.lang}/estate_developer/${slug}`}
              onClick={handleClick}
              className='inline-flex font-primary items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-primary-loginTextColor border border-primary-loginBorder bg-primary-backgroundColor hover:bg-primary-labelColor hover:text-primary-whiteTextColor w-[7.875rem]'>
              {loading ? 'Loading...' : 'Read More'}
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
}
