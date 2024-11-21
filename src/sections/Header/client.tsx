'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { AreaSystem, MENU_ITEMS } from '@/utils/constants';
import { Image, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoGlobe } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { HiBars4 } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import LanguagePopup from '@/components/LanguagePopup';
import { getItem } from '@/utils/storageHelper';

export default function HeaderClient({ lang }: { lang: string }) {
  const path = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLanguagePopupOpen, setLanguagePopupOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prevState => !prevState);
  }, []);

  const toggleLanguagePopup = useCallback(() => {
    setLanguagePopupOpen(prevState => !prevState);
  }, []);

  // const toggleLoginPopup = () => {
  //   setLoginPopupOpen(!isLoginPopupOpen);
  // };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className='flex flex-col'>
      <Navbar className='light z-50 bg-white h-28 flex justify-evenly items-center md:px-16 shadow-md w-full mt-[-2px]'>
        <HiBars4
          className='text-2xl cursor-pointer lg:hidden mr-4'
          onClick={toggleDrawer}
          style={{ color: 'black' }}
        />
        <div className='flex w-full md:w-auto'>
          <NavbarBrand className='flex-shrink-0 mx-auto lg:mx-0'>
            <Link href={`/${lang}`}>
              <div className='w-full md:w-52 lg:w-auto lg:mx-auto text-center cursor-pointer'>
                <Image
                  width={200}
                  alt='PropertyGuru Logo'
                  src='/logo.svg'
                  className='opacity-100'
                />
              </div>
            </Link>
          </NavbarBrand>
        </div>

        <div className='hidden lg:flex gap-4 lg:gap-3  items-center flex-wrap lg:ml-14 xl:ml-0'>
          <NavbarContent className='flex gap-4 lg:gap-3 xl:gap-6 items-center flex-wrap'>
            {MENU_ITEMS.map(item => (
              <Link
                key={item.id}
                href={`/${lang}${item.href}`}
                target='_self'
                className={`text-base font-semibold text-primary-textColor hover:text-white hover:bg-primary-labelColor py-2 px-4 rounded-lg font-primary ${
                  path.indexOf(item.href) > -1
                    ? 'text-black'
                    : 'text-primary-textColor'
                }`}>
                {item.name}
              </Link>
            ))}
          </NavbarContent>
        </div>
        <div className='hidden lg:flex gap-4 justify-end'>
          {/* <div
              className='border border-primary-loginBorder rounded-lg cursor-pointer'
              onClick={toggleLoginPopup}>
              <p className='text-primary-loginTextColor text-sm font-semibold font-primary px-4 py-2'>
                Log In
              </p>
            </div> */}
          <div
            className='rounded-xl bg-primary-settingsBackgroundColor cursor-pointer'
            onClick={toggleLanguagePopup}
            onKeyDown={toggleLanguagePopup}
            tabIndex={0}
            role='button'>
            <div className='flex gap-2 items-center justify-center px-2 py-[0.375rem]'>
              <GoGlobe className='text-primary-secondaryTextColor' />
              <div className='text-sm font-normal text-primary-secondaryTextColor flex-row'>
                EN | AED |{' '}
                {getItem('areaSystem') === AreaSystem.SQUARE_METRES && isMounted
                  ? 'm²'
                  : 'ft²'}
              </div>
              <IoIosArrowDown className='text-primary-textColor cursor-pointer' />
            </div>
          </div>
        </div>
        <div
          className='rounded-xl w-14 h-7 flex justify-center items-center bg-primary-settingsBackgroundColor gap-1 cursor-pointer lg:hidden'
          onClick={toggleLanguagePopup}
          onKeyDown={toggleLanguagePopup}
          tabIndex={0}
          role='button'>
          <GoGlobe className='text-primary-secondaryTextColor text-base pl-1' />
          <div className='text-sm font-normal text-primary-secondaryTextColor flex-row pr-1'>
            EN
          </div>
        </div>
      </Navbar>

      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-transform transform bg-primary-backgroundColor lg:hidden px-6  ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '100%', height: '100%' }}>
        <RxCross2
          onClick={toggleDrawer}
          className='self-end mb-6 cursor-pointer mt-6'
        />
        {MENU_ITEMS.map(item => (
          <div key={item.id}>
            <Link
              href={`/${lang}${item.href}`}
              className='block my-4 text-sm font-normal font-secondary px-3'
              onClick={toggleDrawer}>
              {item.name}
            </Link>
          </div>
        ))}
        {/* <div
          className='bg-primary-labelColor rounded-lg cursor-pointer flex justify-center mt-3'
          onClick={toggleLoginPopup}>
          <p className='text-primary-whiteTextColor text-sm font-primary px-4 py-2'>
            Log In
          </p>
        </div> */}
        {/* <div className='text-primary-secondaryTextColor font-primary text-sm justify-center flex items-center mt-5 underline'>
          Create an Account
        </div> */}
      </div>

      {/* {isLoginPopupOpen && (
        <div
          id='popup-overlay'
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'
          onClick={closePopupOnOutsideClick}>
          <div
            className='bg-white rounded-3xl p-8 shadow-xl relative w-80  md:w-96 h-80'
            onClick={e => e.stopPropagation()}>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-base font-bold'>Log In / Sign Up</p>
              <RxCross2
                onClick={toggleLoginPopup}
                className='text-xl cursor-pointer'
              />
            </div>
            <form>
              <div className='mb-4'>
                <Input className='rounded-[0.625rem]' placeholder='Email' />
              </div>
              <div className='relative mb-4'>
                <Input
                  className='rounded-[0.625rem] pr-10'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                />
                <div
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer'
                  onClick={togglePasswordVisibility}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              <div className='flex justify-between mb-5'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    className='text-primary-secondaryTextColor'
                  />
                  <label
                    htmlFor='terms'
                    className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-primaryTextColor'>
                    Remember my email
                  </label>
                </div>
                <p className='text-xs text-primary-forgetPasswordTextColor cursor-pointer'>
                  Forgot Password?
                </p>
              </div>
              <Button
                type='submit'
                className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
                Log In
              </Button>
              <div className='text-primary-forgetPasswordTextColor font-primary text-sm justify-center flex items-center mt-4 underline cursor-pointer'>
                Create an Account
              </div>
            </form>
          </div>
        </div>
      )} */}
      {isLanguagePopupOpen && (
        <LanguagePopup
          handleModalToggle={toggleLanguagePopup}
          popupPosition='top-20 right-4'
        />
      )}
    </div>
  );
}
