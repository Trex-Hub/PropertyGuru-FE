'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { AreaSystem, MENU_ITEMS } from '@/utils/constants';
import { Image, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { GoGlobe } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { HiBars4 } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import LanguagePopup from '@/components/LanguagePopup';
import { getItem } from '@/utils/storageHelper';
import SignUpForm from '@/components/SignUpForm';
import ForgetPasswordPopup from '@/components/ForgetPasswordPopup';
import InterestForm from '@/components/InterestForm';
import LoggedInUser from '@/components/LoggedInUser';
import { useUser } from '@/contexts/UserContext';
import { getInterestFormForUser } from '@/services/interest-form';
import { ResponseStatusEnum } from '@/models/common';
import LogInForm from '@/components/LogInForm';
import { useLogInFormPopUp } from '@/contexts/LogInFormPopUpContext';
import ResetPasswordForm from '@/components/ResetForm';
import { useResetFormPopupPopUp } from '@/contexts/ResetFormPopupContext';
import MissingDetailsPopUp from '@/components/MissingDetailsPopUp';
import { useMissingDetailsPopup } from '@/contexts/MissingDetailsPopupContext';
export default function HeaderClient({ lang }: { lang: string }) {
  const { isLoggedIn, userDetails } = useUser();
  const { popUpLogInForm, setPopUpLogInForm, toggleLogInFormPopUp } =
    useLogInFormPopUp();

  const { resetPasswordPopUp } = useResetFormPopupPopUp();
  const path = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLanguagePopupOpen, setLanguagePopupOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  // const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isForgetPasswordPopupOpen, setForgetPasswordPopupOpen] =
    useState(false);
  const [isInterestFormOpen, setInterestFormOpen] = useState(false);

  const { isMissingDetailsPopupOpen, setMissingDetailsPopupOpen } =
    useMissingDetailsPopup();

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prevState => !prevState);
  }, []);

  const toggleLanguagePopup = useCallback(() => {
    setLanguagePopupOpen(prevState => !prevState);
  }, []);

  const toggleSignupPopup = () => {
    setForgetPasswordPopupOpen(false);
    setPopUpLogInForm(false);
    setSignUpPopupOpen(!isSignUpPopupOpen);
  };
  const toggleForgetPasswordPopup = () => {
    setSignUpPopupOpen(false);
    setPopUpLogInForm(false);
    setForgetPasswordPopupOpen(!isForgetPasswordPopupOpen);
  };
  const toggleInterestForm = () => {
    if (!isInterestFormOpen) {
      //this function tries to open the interest form if it is not open
      //we need to check if the user has skipped the interest form
      if (localStorage.getItem('skipInterestForm') === 'true') {
        //we don't open and return from here
        return;
      }
    }

    setInterestFormOpen(prev => {
      return !prev;
    });
  };
  const closePopupOnOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === 'popup-overlay') {
        toggleLogInFormPopUp();
      }
    },
    [toggleLogInFormPopUp]
  );
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closePopupOnOutsideClick(e);
      }
    },
    [closePopupOnOutsideClick]
  );
  useEffect(() => {
    const shouldShowPopup = searchParams.get('isLoginPopUp') === 'true';
    setPopUpLogInForm(shouldShowPopup);
  }, [searchParams]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openInterestForm = useCallback(async () => {
    if (isLoggedIn && userDetails?.username) {
      const { status: interestFormStatus, data: interestFormData } =
        await getInterestFormForUser(userDetails?.username);
      if (interestFormStatus === ResponseStatusEnum.SUCCESS) {
        if (interestFormData?.data?.length === 0) {
          setInterestFormOpen(true);
        }
      }
    }
  }, [isLoggedIn, userDetails]);

  useEffect(() => {
    if (localStorage.getItem('skipInterestForm') === 'true') {
      return;
    }
    openInterestForm();
  }, [openInterestForm]);

  useEffect(() => {
    // To ensure when logging in or after, user could see the main page
    if (popUpLogInForm) {
      setDrawerOpen(false);
    }
  }, [popUpLogInForm]);

  return (
    <div className='flex flex-col'>
      <Navbar className='light z-50 bg-white h-20 flex justify-evenly items-center md:px-16 shadow-md w-full mt-[-2px] fixed md:static md:h-28  '>
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
                  src='/pg-logo.svg'
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
          {!isLoggedIn && (
            <div
              className='border border-primary-loginBorder rounded-lg cursor-pointer'
              onClick={toggleLogInFormPopUp}>
              <p className='text-primary-loginTextColor text-sm font-semibold font-primary px-4 py-2'>
                Log In
              </p>
            </div>
          )}
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
          {isLoggedIn && (
            <LoggedInUser lang={lang} toggleInterests={toggleInterestForm} />
          )}
        </div>

        <div className='lg:hidden'>
          {getItem('token') && (
            <LoggedInUser lang={lang} toggleInterests={toggleInterestForm} />
          )}
        </div>
      </Navbar>
      <div className='h-20 md:h-0' />
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
        {!isLoggedIn && (
          <div
            className='bg-primary-labelColor rounded-lg cursor-pointer flex justify-center mt-3'
            onClick={toggleLogInFormPopUp}>
            <p className='text-primary-whiteTextColor text-sm font-primary px-4 py-2'>
              Log In
            </p>
          </div>
        )}
        {getItem('token') && <LoggedInUser lang={lang} />}
        <div
          className='text-primary-secondaryTextColor font-primary text-sm justify-center flex items-center mt-5 underline'
          onClick={toggleSignupPopup}
          role='button'
          tabIndex={0}
          onKeyDown={toggleSignupPopup}>
          Create an Account
        </div>
      </div>

      {popUpLogInForm && !isMissingDetailsPopupOpen && (
        <LogInForm
          closePopupOnOutsideClick={closePopupOnOutsideClick}
          handleKeyDown={handleKeyDown}
          toggleLoginPopup={toggleLogInFormPopUp}
          toggleSignupPopup={toggleSignupPopup}
          toggleForgetPasswordPopup={toggleForgetPasswordPopup}
          setLoginPopupOpen={setPopUpLogInForm}
        />
      )}
      {isLanguagePopupOpen && (
        <LanguagePopup
          handleModalToggle={toggleLanguagePopup}
          popupPosition='top-20 right-4'
        />
      )}
      {isSignUpPopupOpen && (
        <SignUpForm handleModalToggle={toggleSignupPopup} />
      )}
      {isForgetPasswordPopupOpen && (
        <ForgetPasswordPopup handleModalToggle={toggleForgetPasswordPopup} />
      )}
      {isInterestFormOpen && (
        <InterestForm handleModalToggle={toggleInterestForm} />
      )}
      {resetPasswordPopUp && <ResetPasswordForm />}
      {isMissingDetailsPopupOpen && (
        <MissingDetailsPopUp
          setMissingDetailsPopupOpen={setMissingDetailsPopupOpen}
          handleKeyDown={handleKeyDown}
          closePopupOnOutsideClick={closePopupOnOutsideClick}
        />
      )}
    </div>
  );
}
