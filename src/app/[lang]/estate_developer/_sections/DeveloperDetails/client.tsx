'use client';
import { CustomAlertDialog } from '@/components/CustomAlertDialog';
import HtmlContent from '@/components/HtmlContent';
import { Button } from '@/components/ui/button';
import { useLogInFormPopUp } from '@/contexts/LogInFormPopUpContext';
import { useUser } from '@/contexts/UserContext';
import { DeveloperDetailsProps } from '@/models/developer';

import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { convertDescriptionToHtml } from '@/utils/utilities';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import { useSubscribedDevelopersContext } from '@/contexts/SubscribedDevelopers';
export default function DeveloperDetailsClient({
  developerDetails,
}: DeveloperDetailsProps) {
  const { title, logo, description } =
    developerDetails?.data[0].attributes ?? {};
  const developerId = developerDetails?.data?.[0]?.id;
  const descriptionHtml = convertDescriptionToHtml(description);
  const { toggleLogInFormPopUp } = useLogInFormPopUp();
  const {
    isDeveloperSubscribed,
    subscribedDevelopersObj,
    subscribeDeveloper,
    unsubscribeDeveloper,
  } = useSubscribedDevelopersContext();

  const subscribed = useMemo(() => {
    return isDeveloperSubscribed(developerId);
  }, [
    isDeveloperSubscribed,
    subscribedDevelopersObj,
    developerId,
    subscribeDeveloper,
  ]);

  const handleSubscribe = useCallback(() => {
    subscribeDeveloper(developerId);
  }, [developerId, subscribeDeveloper]);
  const handleUnsubscribe = useCallback(() => {
    unsubscribeDeveloper(developerId);
  }, [developerId, unsubscribeDeveloper]);

  const { isLoggedIn } = useUser();

  return (
    <div className='flex flex-col md:px-0 px-4'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-primary-primaryTextColor font-bold font-secondary text-[1.5rem] md:text-[2rem]'>
          {title}
        </h1>
        {isLoggedIn ? (
          <>
            {subscribed ? (
              <CustomAlertDialog onAccept={handleUnsubscribe}>
                <Button
                  variant='ghost'
                  className='inline-flex font-primary items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-2 text-primary-loginTextColor bg-primary-backgroundColor hover:bg-primary-labelColor hover:text-primary-whiteTextColor'>
                  <IoMdNotifications className='text-2xl font-bold' />
                </Button>
              </CustomAlertDialog>
            ) : (
              <Button
                onClick={handleSubscribe}
                variant='ghost'
                className='text-primary-loginTextColor hover:text-primary-loginTextColor/80'>
                <IoMdNotificationsOutline className='text-2xl font-bold' />
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={toggleLogInFormPopUp}
            variant='ghost'
            className='text-primary-loginTextColor hover:text-primary-loginTextColor/80'>
            <IoMdNotificationsOutline className='text-2xl font-bold' />
          </Button>
        )}
      </div>
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
