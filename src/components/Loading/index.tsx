import Image from 'next/image';
import { FaBuilding, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoIosCall } from 'react-icons/io';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { MdMailOutline } from 'react-icons/md';

export function ListCardLoading() {
  return (
    <div className='animate-pulse flex gap-5 w-[20rem] md:w-[25rem]  transform transition-transform duration-300 hover:scale-[1.001]  hover:shadow-xl '>
      <div className='w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto group'>
        {/* image */}
        <div className='image h-[12.5rem] w-full bg-slate-200 rounded-t-[1.25rem]' />
        <div className='p-4 bg-white shadow-md rounded-b-[12px] font-primary'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-1 mb-2'>
              {/* location */}
              <div className='w-[9rem] h-[1rem] bg-slate-200 rounded-full' />
            </div>
            {/* logo */}
            <div className='w-[5rem] h-[1.5rem] bg-slate-200 rounded-full' />
          </div>
          {/* title */}
          <div className='w-[12rem] h-[2.5rem] bg-slate-200 rounded-full' />
          <div className='w-[10rem] h-[2rem] bg-slate-200 rounded-2xl mt-[0.4rem]' />
          <div className='flex gap-2 items-center mb-3 mt-[0.5rem]'>
            <div className='h-[1.2rem] w-[7rem] bg-slate-200 rounded-full' />
            <div className='h-[1.2rem] w-[7rem] bg-slate-200 rounded-full' />
          </div>
          <div className='flex mb-3 gap-2 overflow-x-auto max-w-full'>
            <div className='w-[6rem] h-[0.8rem] bg-slate-200 rounded-full' />
            <div className='w-[5rem] h-[0.8rem] bg-slate-200 rounded-full' />
            <div className='w-[3rem] h-[0.8rem] bg-slate-200 rounded-full' />
            <div className='w-[4rem] h-[0.8rem] bg-slate-200 rounded-full' />
            <div className='w-[4.9rem] h-[0.8rem] bg-slate-200 rounded-full' />
          </div>

          <div className='flex justify-between items-center '>
            <div className='w-[8rem] h-[2rem] bg-slate-200 rounded-full' />
            <div className='flex gap-4 items-center'>
              <div className='w-[3rem] h-[1.2rem] bg-slate-200 rounded-full' />
              <div className='w-[3.4rem] h-[1.2rem] bg-slate-200 rounded-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedPropertiesLoading() {
  return (
    <div className='flex flex-col justify-center items-center pb-16'>
      <p className='font-teriary text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor'>
        Our featured properties
      </p>
      {/* <div className='rounded-full bg-slate-200 h-[1.2rem] w-[30rem] mb-2' /> */}
      <div className='animate-pulse flex flex-col justify-center items-center'>
        <div className='flex gap-2 mt-3 md:mt-[2.2rem] mb-2 px-2'>
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[4rem]  mx-4 mt-1 mb-2' />
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[8rem]  mx-4 mt-1 mb-2' />
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[6rem]  mx-4 mt-1 mb-2' />
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[10rem] mx-4 mt-1 mb-2' />
        </div>
        <div className='mb-2'>
          <div className='grid gap-8 p-5'>
            {/* Large screens */}
            <div className='hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
            </div>
            {/* Small screens */}
            <div className='flex md:hidden overflow-x-auto gap-5'>
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center w-[7rem] h-[2.25rem] md:w-[9.3125rem] md:h-[3.5rem] rounded-xl bg-primary-labelColor text-primary-whiteTextColor text-sm md:text-lg font-semibold font-primary hover:bg-primary-labelColor gap-1'>
        See More
        <IoArrowForwardOutline />
      </div>
    </div>
  );
}

export function NewLaunchesLoading() {
  return (
    <div className='flex flex-col justify-center items-center bg-primary-iconBackgroundColor pb-16'>
      <p className='font-teriary text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor mt-[3.5rem]'>
        New Launches
      </p>
      <div className='flex flex-col justify-center items-center animate-pulse'>
        <div className='flex gap-2 mt-3 md:mt-[2.2rem] mb-2'>
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[4rem]  mx-4 mt-1 mb-2' />
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[8rem]  mx-4 mt-1 mb-2' />
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[6rem]  mx-4 mt-1 mb-2' />
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[10rem] mx-4 mt-1 mb-2' />
        </div>
        <div className='mb-2'>
          <div className='grid gap-8 p-5'>
            {/* Large screens */}
            <div className='hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
            </div>
            {/* Small screens */}
            <div className='flex md:hidden overflow-x-auto gap-5'>
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
              <ListCardLoading />
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center w-[7rem] h-[2.25rem] md:w-[9.3125rem] md:h-[3.5rem] rounded-xl bg-primary-labelColor text-primary-whiteTextColor text-sm md:text-lg font-semibold font-primary hover:bg-primary-labelColor gap-1'>
        See More
        <IoArrowForwardOutline />
      </div>
    </div>
  );
}

export function TopDevelopersLoading() {
  return (
    <>
      <div className='rounded-full animate-pulse bg-slate-200 h-[1.4rem] w-[11rem]  mx-4 mt-1 mb-2' />
      <div className='rounded-full animate-pulse bg-slate-200 h-[1.4rem] w-[11rem]  mx-4 mt-1 mb-2' />
      <div className='rounded-full animate-pulse bg-slate-200 h-[1.4rem] w-[11rem]  mx-4 mt-1 mb-2' />
      <div className='rounded-full animate-pulse bg-slate-200 h-[1.4rem] w-[11rem]  mx-4 mt-1 mb-2' />
      <div className='rounded-full animate-pulse bg-slate-200 h-[1.4rem] w-[11rem]  mx-4 mt-1 mb-2' />
    </>
  );
}

export function EnquiryFormLoader() {
  return (
    <div className='animate-pulse p-6 pt-7 mt-4 w-full h-[20.75rem] my-3 md:m-3 shadow-md font-primary md:rounded-xl overflow-hidden bg-white rounded-lg'>
      <div className='flex flex-col px-4 py-5 gap-4 '>
        <p className='text-base font-bold font-secondary text-primary-contactUsTextColor'>
          Enquire Now
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='bg-slate-200 h-[2.2rem] w-full rounded-lg' />
        <div className='bg-slate-200 h-[2.2rem] w-full rounded-lg' />
        <div className='bg-slate-200 h-[2.2rem] w-full rounded-lg' />
        <div className='bg-slate-200 h-[1rem] w-full rounded-lg' />
        <div className='flex gap-3 mt-3'>
          <div className='bg-slate-200 h-[2.5rem] w-full rounded-lg' />
          <div className='bg-slate-200 h-[2.5rem] w-full rounded-lg' />
          <div className='bg-slate-200 h-[2.5rem] w-full rounded-lg' />
        </div>
      </div>
    </div>
  );
}

export function FeaturedPropertiesLoader() {
  return (
    <div className='animate-pulse w-full rounded-[0.313rem] shadow-md h-[36.188rem] overflow-hidden bg-white'>
      <div className='flex flex-col p-6 gap-6 w-full'>
        <p className='text-base font-semibold font-secondary text-primary-textColor'>
          Featured Properties
        </p>
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-center gap-5 mb-5 font-primary'>
            <div className='rounded-[0.313rem] w-[8.313rem] h-[6.313rem] bg-slate-200' />
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
            </div>
          </div>
          <div className='flex items-start justify-start gap-5 mb-5 font-primary'>
            <div className='rounded-[0.313rem] w-[8.313rem] h-[6.313rem] bg-slate-200' />
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
            </div>
          </div>
          <div className='flex items-start justify-start gap-5 mb-5 font-primary'>
            <div className='rounded-[0.313rem] w-[8.313rem] h-[6.313rem] bg-slate-200' />
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
            </div>
          </div>
          <div className='flex items-start justify-start gap-5 mb-5 font-primary'>
            <div className='rounded-[0.313rem] w-[8.313rem] h-[6.313rem] bg-slate-200' />
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[2rem] w-[15rem] rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SearchBarContainerLoader = () => {
  return (
    <div className='relative w-full h-64 md:h-96 lg:h-[31.25rem]'>
      <Image
        fill
        priority
        alt='PropertyGuru Logo'
        src='/home_background.svg'
        className='object-cover'
      />
      <div className='absolute top-1/3 lg:top-[43%] w-full text-center px-4'>
        <h1 className='text-white text-2xl md:text-3xl lg:text-[2.5rem] font-bold'>
          Your Key to Smart Real Estate Investments
        </h1>
      </div>
      <div className='flex flex-col absolute bottom-0 top-[75%] md:top-[68%] lg:top-[72%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[75%]'>
        <div className='bg-primary-backgroundColor rounded-[1.25rem] flex flex-col lg:flex-row mb-4 md:mb-0 shadow-lg'>
          <div className='w-full px-4 py-5 lg:px-8 lg:py-7 text-left font-secondary'>
            <p className='text-primary-textColor font-medium text-sm mb-4'>
              Your Search Criteria...
            </p>
            <div className='flex flex-col w-full animate-pulse'>
              <div className='flex flex-col items-center px-5 py-3 font-primary lg:gap-6 gap-3 '>
                <div className='flex flex-col lg:flex-row w-full justify-between gap-3'>
                  <div className='w-full lg:flex-grow appearance-none text-xs md:text-sm bg-slate-200 rounded-lg px-4 py-2 h-[3.5rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'></div>
                  <div className='w-full lg:flex-grow-0 lg:basis-1/4 appearance-none text-xs md:text-sm bg-slate-200 rounded-lg px-4 py-2 h-[3.5rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'></div>
                </div>

                <div className='flex flex-col lg:flex-row gap-3 items-center w-full'>
                  <div className='w-full lg:w-auto lg:flex-grow lg:max-w-[16rem] appearance-none text-xs md:text-sm bg-slate-200 rounded-lg px-4 py-2 h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'></div>
                  <div className='w-full lg:w-auto lg:flex-grow lg:max-w-[20rem] appearance-none text-xs md:text-sm bg-slate-200 rounded-lg px-4 py-2 h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'></div>
                  <div className='w-full lg:w-auto lg:flex-grow lg:max-w-[16rem] appearance-none text-xs md:text-sm bg-slate-200 rounded-lg px-4 py-2 h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'></div>
                  <div className='w-full lg:w-auto lg:flex-grow lg:max-w-[16rem] appearance-none text-xs md:text-sm bg-slate-200 rounded-lg px-4 py-2 h-[3.5rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TopDevelopersLoader = () => {
  return (
    <div className='flex flex-col justify-center items-center my-5 md:my-16'>
      <p className='font-secondary text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor text-center'>
        Our Top Partners
      </p>
      <p className='text-base font-primary text-primary-iconColor mt-3 text-center px-5 md:px-10'>
        If you have properties for sale based on their plans, showcase them in
        your homepage to attract investors.
      </p>
      <div className='flex flex-wrap animate-pulse items-center justify-center gap-5 md:gap-14 my-12'>
        <IoIosArrowBack className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
        <div className='rounded-full animate-pulse bg-slate-200 h-[7rem] w-[7rem]  md:h-[11rem] md:w-[11rem]  mx-4 mt-1 mb-2' />
        <div className='rounded-full animate-pulse bg-slate-200 h-[7rem] w-[7rem]  md:h-[11rem] md:w-[11rem]  mx-4 mt-1 mb-2' />
        <div className='rounded-full animate-pulse bg-slate-200 h-[7rem] w-[7rem]  md:h-[11rem] md:w-[11rem]  mx-4 mt-1 mb-2' />
        <div className='rounded-full animate-pulse bg-slate-200 h-[7rem] w-[7rem]  md:h-[11rem] md:w-[11rem]  mx-4 mt-1 mb-2' />
        <div className='rounded-full animate-pulse bg-slate-200 h-[7rem] w-[7rem]  md:h-[11rem] md:w-[11rem]  mx-4 mt-1 mb-2' />
        <IoIosArrowForward className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
      </div>
    </div>
  );
};

export const GoogleAdVideoLoader = () => {
  return (
    <div className='flex justify-center items-center py-2'>
      <div className='animate-pulse image h-[15rem] bg-slate-200 rounded-[1.25rem]  flex gap-5 w-[20rem] md:w-[25rem] transform transition-transform duration-300 hover:scale-[1.001] hover:shadow-xl justify-center items-center'></div>
    </div>
  );
};

export const FooterLoader = () => {
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
              <div className='text-primary-footerTextColor flex gap-3 font-semibold'>
                <IoIosCall />
                <p className='text-[0.8125rem]'>+971 4 494 1222</p>
              </div>
              <div className='text-primary-footerTextColor flex gap-3 font-semibold'>
                <MdMailOutline />
                <p className='text-[0.8125rem]'>adops@propertyguru.ae</p>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='w-10 h-10 bg-primary-footerIconBackgroundColor flex items-center justify-center cursor-pointer hover:bg-primary-labelColor'>
                <FaFacebookF className='text-primary-footerTextColor hover:text-primary-whiteTextColor' />
              </div>
              <div className='w-10 h-10 bg-primary-footerIconBackgroundColor flex items-center justify-center cursor-pointer hover:bg-primary-labelColor'>
                <FaInstagram className='text-primary-footerTextColor hover:text-primary-whiteTextColor' />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-[1.0625rem] font-bold mb-6 text-primary-footerTitleColor'>
              Lists by Category
            </p>

            <div className='flex flex-col gap-3 mb-7'>
              <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
            </div>
          </div>

          <div className='flex flex-col'>
            <p className='text-[1.0625rem] font-bold mb-6 text-primary-footerTitleColor'>
              Latest Properties
            </p>
            <div className='flex flex-col gap-5 mb-7'>
              <div className='flex gap-2 justify-center items-center'>
                <div className='bg-slate-600 h-[5rem] w-[5rem] rounded-lg' />
                <div className='flex flex-col gap-2'>
                  <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
                  <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
                  <div className='bg-slate-600 h-[1rem] w-[7rem] rounded-lg' />
                </div>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <div className='bg-slate-600 h-[5rem] w-[5rem] rounded-lg' />
                <div className='flex flex-col gap-2'>
                  <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
                  <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
                  <div className='bg-slate-600 h-[1rem] w-[7rem] rounded-lg' />
                </div>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <div className='bg-slate-600 h-[5rem] w-[5rem] rounded-lg' />
                <div className='flex flex-col gap-2'>
                  <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
                  <div className='bg-slate-600 h-[1rem] w-[15rem] rounded-lg' />
                  <div className='bg-slate-600 h-[1rem] w-[7rem] rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-footerCopyrightBackgroundColor w-full h-[76px] lg:h-[60px] flex items-center'>
          <div className='flex flex-col lg:h-[60px] lg:flex-row lg:px-28 lg:gap-40 w-full justify-center  items-center gap-2'>
            <p className='text-[0.8125rem] text-primary-footerTextColor'>
              Copyright 2024 | All Rights Reserved
            </p>
            <p className='text-[0.8125rem] text-primary-footerTextColor hover:text-primary-labelColor'>
              Terms and Conditions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
