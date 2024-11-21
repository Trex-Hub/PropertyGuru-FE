'use client';
import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { FaBuilding, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { MdMailOutline } from 'react-icons/md';
import { Property } from '@/models/property';
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  NEXT_PUBLIC_ASSETS_URL,
} from '@/utils/constants';
import Link from 'next/link';
import { formatPriceWithCommas, toLowerCase } from '@/utils/utilities';

export default function FooterClient({
  categoriesCount,
  latestProperties,
  lang,
}: any) {
  const handleFacebookClick = useCallback(() => {
    window.open(FACEBOOK_LINK, '_blank');
  }, []);

  const handleInstagramClick = useCallback(() => {
    window.open(INSTAGRAM_LINK, '_blank');
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className='relative w-full lg:h-[475px] h-full'>
      <Image
        src='/footer_background.svg'
        alt='Footer Background'
        fill
        className='absolute inset-0 object-cover'
      />
      <div className='absolute inset-0 bg-primary-footerColor opacity-[0.97]'></div>

      <div className='relative z-10 flex flex-col h-full'>
        <div className='flex flex-col items-start justify-between h-full gap-10 font-primary px-8 py-10 lg:px-28 lg:py-20 lg:flex-row'>
          <div className='flex flex-col'>
            <p className='text-[1.0625rem] font-bold mb-6 text-primary-footerTitleColor'>
              Contact Us
            </p>
            <div className='flex flex-col gap-3 mb-7'>
              <div className='text-primary-footerTextColor flex gap-3 font-semibold'>
                <FaBuilding />
                <p className='text-[0.8125rem]'>
                  UAE – Dubai Media City – Concord Tower – 9th Floor
                </p>
              </div>
              <a
                className='text-primary-footerTextColor flex gap-3 font-semibold'
                href='tel:+97144941222'>
                <IoIosCall />
                <p className='text-[0.8125rem]'>+971 4 494 1222</p>
              </a>
              <a
                className='text-primary-footerTextColor flex gap-3 font-semibold'
                href='mailto:adops@propertyguru.ae'>
                <MdMailOutline />
                <p className='text-[0.8125rem]'>adops@propertyguru.ae</p>
              </a>
            </div>
            <div className='flex gap-3'>
              <div
                className='w-10 h-10 bg-primary-footerIconBackgroundColor flex items-center justify-center cursor-pointer hover:bg-primary-labelColor'
                onClick={handleFacebookClick}
                role='button'
                tabIndex={0}
                onKeyDown={handleFacebookClick}>
                <FaFacebookF className='text-primary-footerTextColor hover:text-primary-whiteTextColor' />
              </div>
              <div
                className='w-10 h-10 bg-primary-footerIconBackgroundColor flex items-center justify-center cursor-pointer hover:bg-primary-labelColor'
                onClick={handleInstagramClick}
                role='button'
                tabIndex={0}
                onKeyDown={handleInstagramClick}>
                <FaInstagram className='text-primary-footerTextColor hover:text-primary-whiteTextColor' />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-[1.0625rem] font-bold mb-6 text-primary-footerTitleColor'>
              Lists by Category
            </p>

            <div className='flex flex-col gap-3 mb-7'>
              {categoriesCount &&
                Object.entries(categoriesCount)
                  .filter(([count]) => count)
                  .map(([category, count]) => (
                    <Link
                      href={`/${lang}/listings/${toLowerCase(category)}`}
                      key={category}>
                      <p
                        key={category}
                        className='text-[0.8125rem] font-semibold text-primary-footerTextColor'>
                        {category} ({count?.toString()})
                      </p>
                    </Link>
                  ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <p className='text-[1.0625rem] font-bold mb-6 text-primary-footerTitleColor'>
              Latest Properties
            </p>
            <div className='flex flex-col gap-5 mb-7'>
              {latestProperties &&
                latestProperties?.data?.length > 0 &&
                latestProperties.data.slice(0, 3).map((property: Property) => (
                  <Link
                    href={`/${lang}/properties/${property.attributes.slug}`}
                    key={property.id}>
                    <div className='flex gap-4'>
                      {property?.attributes?.image?.data[0]?.attributes
                        ?.url && (
                        <Image
                          src={`${NEXT_PUBLIC_ASSETS_URL}${property?.attributes?.image?.data[0]?.attributes?.url}`}
                          alt={
                            property?.attributes?.image?.data[0]?.attributes
                              ?.alternativeText ?? 'Latest Properties'
                          }
                          width={102}
                          height={68}
                        />
                      )}
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm font-semibold text-primary-footerTextColor'>
                          {property.attributes.title}
                        </p>
                        <p className='text-[0.8125rem] font-semibold text-primary-whiteTextColor'>
                          Starting From AED <br />
                          {formatPriceWithCommas(property.attributes.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className='bg-primary-footerCopyrightBackgroundColor w-full h-[76px] lg:h-[60px] flex items-center'>
          <div className='flex flex-col lg:h-[60px] lg:flex-row lg:px-28 lg:gap-40 w-full justify-center  items-center gap-2'>
            <p className='text-[0.8125rem] text-primary-footerTextColor'>
              Copyright {year} | All Rights Reserved
            </p>
            <Link href={`/${lang}/terms-and-conditions`}>
              <p className='text-[0.8125rem] text-primary-footerTextColor hover:text-primary-labelColor'>
                Terms and Conditions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
