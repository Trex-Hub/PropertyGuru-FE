'use client';
import Image from 'next/image';
import { Developers } from '@/models/developer';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { convertToSingleDiv, ellipsesText } from '@/utils/utilities';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import HtmlContent from '../HtmlContent';
import { Button } from '../ui/button';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Check } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useSubscribedDevelopersContext } from '@/contexts/SubscribedDevelopers';
import { useLogInFormPopUp } from '@/contexts/LogInFormPopUpContext';
import { CustomAlertDialog } from '../CustomAlertDialog';
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
  const { logo, title, description, slug } = developer.attributes ?? {};

  // Normalize properties into an array
  const properties = Array.isArray(developer?.attributes?.properties)
    ? developer?.attributes?.properties
    : developer?.attributes?.properties?.data ?? [];

  const { toggleLogInFormPopUp } = useLogInFormPopUp();
  const router = useRouter();
  const {
    isDeveloperSubscribed,
    subscribedDevelopersObj,
    subscribeDeveloper,
    unsubscribeDeveloper,
  } = useSubscribedDevelopersContext();

  const subscribed = useMemo(() => {
    return isDeveloperSubscribed(developer.id);
  }, [isDeveloperSubscribed, subscribedDevelopersObj, developer]);

  const handleClick = useCallback(() => {
    const url = `/${params?.lang}/estate_developer/${slug}`;
    router.push(url);
  }, [router, slug]);

  const descriptionHtml = convertToSingleDiv(description);
  const { isLoggedIn } = useUser();

  const handleSubscribe = useCallback(() => {
    if (isLoggedIn) {
      subscribeDeveloper(developer.id);
    }
  }, [isLoggedIn, developer, subscribeDeveloper]);

  const handleUnsubscribe = useCallback(() => {
    if (isLoggedIn) {
      unsubscribeDeveloper(developer.id);
    }
  }, [isLoggedIn, developer, unsubscribeDeveloper]);

  return (
    <div className='flex flex-col w-[20rem] md:w-[25.5rem] md:h-[32.5rem] rounded-[0.625rem] border border-[#AEAEAE80]  bg-primary-whiteTextColor  overflow-hidden'>
      <div className='w-[20rem] md:w-[25.5rem] h-[17.5rem] mx-auto overflow-hidden rounded-t-[0.625rem]'>
        <div className='w-full h-full flex justify-center items-center p-6'>
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
      <div className='flex flex-col flex-grow p-5 justify-between bg-[#FAFAFA] border border-t-white border-b-[#AEAEAE80]'>
        <div className='flex flex-col gap-2'>
          <div
            className='text-2xl font-bold font-primary text-primary-textColor'
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={0}
            role='button'>
            {ellipsesText(title, 30)}
          </div>
          <div className='flex flex-row items-center'>
            <div className='text-primary-primaryTextColor text-lg font-bold pr-1.5'>
              {properties?.length}
            </div>
            <div className='text-primary-secondaryTextColor text-sm'>
              Project{properties?.length > 1 && 's'}
            </div>
          </div>
          <div className='relative'>
            <div className='text-base font-primary text-primary-secondaryTextColor text-wrap line-clamp-4'>
              <HtmlContent stripeStype>{descriptionHtml}</HtmlContent>
            </div>
            {/* Gradient fade + Read More link */}
            <div className='absolute bottom-0 right-0 bg-[#FAFAFA] w-[5.5rem] h-6' />
            <Link
              href={`/${params?.lang}/estate_developer/${slug}`}
              className='font-primary text-primary-labelColor absolute bottom-0 right-0 ml-2'>
              Read More
            </Link>
          </div>
        </div>
        <div>
          {isLoggedIn && subscribed ? (
            <div className='flex flex-row py-2 px-2 md:px-4 mt-4 items-center w-full justify-between bg-[#3CBF5833] border-primary-dropdownInputBorderColor p-2'>
              <div className='flex text-md items-center gap-1'>
                <Check className='text-primary-secondaryTextColor' />
                Subscribed
              </div>
              <CustomAlertDialog onAccept={handleUnsubscribe}>
                <Button className='inline-flex font-primary items-center justify-center text-primary-secondaryTextColor  whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-2 border border-primary-loginBorder bg-primary-backgroundColor hover:bg-primary-labelColor hover:text-primary-whiteTextColor'>
                  Unsubscribe
                </Button>
              </CustomAlertDialog>
            </div>
          ) : (
            <div className='flex flex-row py-2 px-2 md:px-4 mt-4 rounded-md items-center justify-center w-full gap-1  bg-primary-backgroundColor border border-primary-dropdownInputBorderColor'>
              <div className='text-xs md:text-sm text-bold w-1/2 text-wrap'>
                Get Property Info and new property alerts
              </div>
              <Button
                onClick={isLoggedIn ? handleSubscribe : toggleLogInFormPopUp}
                className='inline-flex font-primary items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 py-2 border border-primary-loginBorder bg-primary-labelColor text-primary-whiteTextColor w-1/2 hover:bg-primary-labelColor/80'>
                <IoMdNotificationsOutline className='text-2xl font-bold' />{' '}
                Subscribe Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
