'use client';
import { useUser } from '@/contexts/UserContext';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { HiChevronUpDown } from 'react-icons/hi2';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoggedInUser({
  toggleInterests,
  lang,
}: {
  toggleInterests?: () => void;
  lang?: string;
}) {
  const { userDetails, onLogout } = useUser();
  const router = useRouter();

  const handleClickWishlist = () => {
    router.push(`/${lang}/wishlist`);
  };

  return (
    <Popover>
      <PopoverTrigger className='flex items-center justify-center'>
        <div className='w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-800 border border-primary-labelColor' />
        <HiChevronUpDown className='text-primary-secondaryTextColor' />
      </PopoverTrigger>
      <PopoverContent className='mt-9 font-secondary mr-2'>
        <div className='py-3 px-2 border-b border-b-border'>
          <p>Welcome {userDetails?.username}</p>
          <p className='text-primary-secondaryTextColor'>
            {userDetails?.email}
          </p>
        </div>
        <div className='mt-4 px-2 w-full flex flex-col gap-1'>
          <PopoverClose asChild>
            <Link
              href={`/${lang}/subscribed-developers?subscriptionId=${userDetails?.developer_subscriptions}`}
              className='bg-transparent text-primary-contactUsTextColor p-0 px-2 rounded-sm text-base py-2 w-full h-full hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex justify-start items-center'>
              Subscribed Developers
            </Link>
          </PopoverClose>
          <PopoverClose
            onClick={() => {
              localStorage.removeItem('skipInterestForm');
              if (toggleInterests) toggleInterests();
            }}
            className='bg-transparent text-primary-contactUsTextColor p-0 px-2 rounded-sm text-base py-2 w-full h-full hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex justify-start items-center'>
            Interest Form
          </PopoverClose>
          <PopoverClose
            onClick={handleClickWishlist}
            className='bg-transparent text-primary-contactUsTextColor p-0 px-2 rounded-sm text-base py-2 w-full h-full hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex justify-start items-center'>
            Favorite
          </PopoverClose>
          <PopoverClose
            onClick={onLogout}
            className='bg-transparent text-primary-contactUsTextColor p-0 px-2 rounded-sm text-base py-2 w-full h-full hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex justify-start items-center'>
            Logout
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
