'use client';
import { FACEBOOK_LINK, INSTAGRAM_LINK } from '@/utils/constants';
import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function FollowUs() {
  return (
    <div className='flex flex-col justify-center gap-5 items-start ml-16'>
      <p className='font-secondary text-base font-semibold '>Follow us on</p>
      <div className='flex gap-2'>
        <Link href={FACEBOOK_LINK} target='_blank'>
          <div
            className='bg-primary-whiteTextColor border border-primary-dropdownInputBorderColor rounded-lg text-primary-secondaryTextColor text-xs font-primary gap-1 hover:text-primary-whiteTextColor flex items-center p-2 hover:bg-primary-labelColor'
            rel='noopener noreferrer'>
            <FaFacebookF className='text-primary-secondaryTextColor hover:text-primary-whiteTextColor text-base' />
            Facebook
          </div>
        </Link>

        <Link href={INSTAGRAM_LINK} target='_blank'>
          <div
            className='bg-primary-whiteTextColor border border-primary-dropdownInputBorderColor rounded-lg text-primary-secondaryTextColor text-xs font-primary gap-1 hover:text-primary-whiteTextColor flex items-center p-2  hover:bg-primary-labelColor'
            rel='noopener noreferrer'>
            <FaInstagram className='text-primary-secondaryTextColor hover:text-primary-whiteTextColor text-base' />
            Instagram
          </div>
        </Link>
      </div>
    </div>
  );
}
