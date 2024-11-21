'use client';
import ListCard from '@/components/ListCard';
import { Property } from '@/models/property';
import { NEXT_PUBLIC_ASSETS_URL, ROUTE_OPTIONS } from '@/utils/constants';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Developers } from '@/models/developer';
import { Button } from '@/components/ui/button';

interface DeveloperPropertiesClientProps {
  developerProperties: Property[];
  params: {
    slug: string;
    lang: string;
  };
  developerDetails: {
    data: Developers[];
  };
}

const DeveloperPropertiesClient = ({
  developerProperties,
  params,
  developerDetails,
}: DeveloperPropertiesClientProps) => {
  const { title, logo } = developerDetails.data[0].attributes;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const navigateToAdvancedSearch = useCallback(
    (developer: string) => () => {
      setLoading(true);
      router.push(
        `/en/${ROUTE_OPTIONS.ADVANCED_SEARCH}?developer=${encodeURIComponent(developer)}`
      );
    },
    [router]
  );
  if (developerProperties.length === 0) {
    return null;
  }
  return (
    <div className=' bg-primary-backgroundColor w-full text-primary-textColor mt-7'>
      <div className='flex justify-between '>
        <div className='flex flex-col gap-1'>
          <p className='text-xl leading-[1.25rem] font-semibold p-2 font-secondary'>
            Properties by {title}
          </p>
          <Button
            className='w-[5rem] h-[1.5rem] rounded-sm bg-primary-labelColor text-primary-whiteTextColor text-xs font-semibold font-primary flex hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border gap-1 ml-2 items-center justify-center'
            onClick={navigateToAdvancedSearch(title)}
            disabled={loading}>
            {loading ? 'Loading...' : 'See All'}
            <FaChevronRight className='text-base' />
          </Button>
        </div>
        {logo?.data?.attributes?.url && (
          <Image
            width={128}
            height={64}
            sizes='100vw'
            className='w-[10rem] h-[6rem]'
            alt='Developer Images'
            src={`${NEXT_PUBLIC_ASSETS_URL}${logo?.data?.attributes?.url}`}
          />
        )}
      </div>
      <div className='mt-2'>
        <div className='hidden md:flex md:gap-5 lg:flex lg:gap-5 w-full h-full overflow-x-auto '>
          {developerProperties.slice(0, 2).map((property: Property) => (
            <ListCard key={property.id} property={property} params={params} />
          ))}
        </div>
        <div className='flex md:hidden overflow-x-auto gap-5 px-4'>
          {developerProperties.slice(0, 2).map((property: Property) => (
            <ListCard property={property} key={property.id} params={params} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperPropertiesClient;
