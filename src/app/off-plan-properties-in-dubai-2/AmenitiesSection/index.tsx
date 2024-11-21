'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCallback } from 'react';
import {
  FaCoins,
  FaMoneyCheckAlt,
  FaPercentage,
  FaWater,
} from 'react-icons/fa';

export default function AmenitiesSection() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <div className='flex md:flex-row flex-col w-full gap-10 xl:px-44 px-5 md:py-20 py-10 justify-center items-center'>
        <div className='md:w-[50%] md:h-[328px] w-full h-full'>
          <Image
            height={328}
            width={525}
            alt='Pool View Logo'
            src='/pool_view.jpg'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col flex-wrap md:w-[50%] w-full gap-2 '>
          <div className='text-primary-labelColor text-[2.5rem] font-bold font-teriary leading-[3rem]'>
            Experience life at the pinnacle of paradise!
          </div>
          <div className='text-sm text-primary-secondaryTextColor'>
            A gateway to a waterfront lifestyle of beauty and tranquility. Brand
            New community that is encircled with everyday essentials such as
            residential as well as a business hub, healthcare facilities and
            health institutions as well as gives easily reachable distance to
            proximity areas. You get the blend of lavish apartments, high-end
            villas, and opulent townhouses. It is a community that is replete
            with world-class amenities bringing the best facilities for living.
          </div>
          <div className='text-lg text-primary-primaryTextColor font-[800]'>
            Amenities
          </div>
          <div className='flex lg:flex-row md:flex-col flex-col lg:items-center lg:justify-center md:items-start items-start lg:gap-40 md:gap-3 gap-3'>
            <ul className='list-disc list-inside text-green-600 items-center justify-center'>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Infinity Pool
              </li>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Outdoor Gym
              </li>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                BBQ Spaces
              </li>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Sky Garden
              </li>
            </ul>
            <ul className='list-disc list-inside text-green-600 items-center justify-center'>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Yoga Zone
              </li>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Green Surrounding
              </li>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Health Care Centre
              </li>
              <li className='flex items-center  text-primary-secondaryTextColor text-sm'>
                <span className='w-[0.3rem] h-[0.3rem] bg-green-600  inline-block mr-2'></span>
                Parks and Leisure Areas
              </li>
            </ul>
          </div>
          <div className='flex md:justify-start justify-center'>
            <Button
              className='bg-primary-labelColor rounded-sm hover:bg-primary-labelColor text-primary-backgroundColor w-[10rem] mt-7'
              onClick={scrollToTop}>
              Check Availability
            </Button>
          </div>
        </div>
      </div>
      <div className='flex lg:flex-row lg:flex-nowrap md:flex-nowrap md:flex-row flex-wrap gap-5 xl:px-36 px-8 md:py-7 py-1'>
        <div className='border border-primary-labelColor transition-transform duration-300 ease-in-out hover:scale-110'>
          <div className='flex flex-col justify-center items-center p-2 gap-5'>
            <FaCoins className='text-5xl text-primary-labelColor' />
            <div className='text-[#575757] text-2xl font-bold text-center'>
              Properties With Highest ROI
            </div>
            <div className='text-sm text-primary-secondaryTextColor text-center'>
              We have properties with highest ROI off-plan projects launched in
              Dubai this year with a guaranteed returns of 8 - 10% annually.
            </div>
          </div>
        </div>
        <div className='border border-primary-labelColor transition-transform duration-300 ease-in-out hover:scale-110'>
          <div className='flex flex-col justify-center items-center p-2 gap-5'>
            <FaPercentage className='text-5xl text-primary-labelColor' />
            <div className='text-[#575757] text-2xl font-bold text-center'>
              Long Term Payment Plans
            </div>
            <div className='text-sm text-primary-secondaryTextColor text-center'>
              We have properties that offer 1% monthly payment plans in Dubai.
              Also, properties with post handover payment plans also available.
            </div>
          </div>
        </div>
        <div className='border border-primary-labelColor transition-transform duration-300 ease-in-out hover:scale-110'>
          <div className='flex flex-col justify-center items-center p-2 gap-5'>
            <FaMoneyCheckAlt className='text-5xl text-primary-labelColor' />
            <div className='text-[#575757] text-2xl font-bold text-center'>
              Get Best-in-Market Mortgage
            </div>
            <div className='text-sm text-primary-secondaryTextColor text-center'>
              Enjoy a range of great rates on Mortgage from the top bank in UAE
              with fixed and variable rate options, high mortgage amounts and
              low fees.
            </div>
          </div>
        </div>
        <div className='border border-primary-labelColor transition-transform duration-300 ease-in-out hover:scale-110'>
          <div className='flex flex-col justify-center items-center p-2 gap-5'>
            <FaWater className='text-5xl text-primary-labelColor' />
            <div className='text-[#575757] text-2xl font-bold text-center px-5'>
              Waterfront Apartments
            </div>
            <div className='text-sm text-primary-secondaryTextColor text-center'>
              High-rise properties represent the ultimate selection of rooms
              with sea views, balconies and lots of space in the thriving heart
              of New Dubai.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
