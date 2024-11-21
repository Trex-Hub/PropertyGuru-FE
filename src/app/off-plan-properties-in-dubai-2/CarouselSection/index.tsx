'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarouselSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };
  return (
    <div className='py-5'>
      <div className='border-t-4 border-primary-labelColor rounded-tl-xl rounded-tr-xl'>
        <div className='flex justify-center items-center py-7'>
          <div className='flex md:flex-row flex-col items-center w-full md:w-auto'>
            <div className='md:flex-1 text-center md:text-[46px] text-2xl font-senary font-semibold text-primary-radioButtonTextColor leading-[3rem]'>
              Freehold Ownership For All Nationalities
            </div>
            <div className='hidden md:block border-primary-labelColor border-r-[3px] h-24 mx-4' />

            <div className='md:hidden border-primary-labelColor border-t-[3px] w-full' />

            <div className='md:flex-1 text-center md:text-[46px] text-2xl font-senary font-semibold text-primary-radioButtonTextColor leading-[3rem]'>
              Limited Units Available
            </div>
          </div>
        </div>
      </div>
      <div className='w-full  mx-auto mt-5'>
        <Slider {...settings}>
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/carousel_1.jpg'
              alt='Image 1'
              layout='responsive'
              width={1200}
              height={400}
              className='w-full h-auto object-cover'
            />
            <div
              className='md:text-[45px] text-lg  text-primary-labelColor font-[800] mt-3 text-center'
              style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 0.31)' }}>
              ADDRESS RESIDENCES BY EMAAR
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/carousel_2.jpg'
              alt='Image 2'
              layout='responsive'
              width={1200}
              height={400}
              className='w-full h-auto object-cover'
            />
            <div
              className='md:text-[45px]  text-lg text-primary-labelColor font-[800] mt-3 text-center'
              style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 0.31)' }}>
              DAMAC BAY 2
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/carousel_3.webp'
              alt='Image 3'
              layout='responsive'
              width={1200}
              height={400}
              className='w-full h-auto object-cover'
            />
            <div
              className='md:text-[45px] text-lg text-primary-labelColor font-[800] mt-3 text-center'
              style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 0.31)' }}>
              SOBHA 360 RIVERSIDE CRESCENT
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
