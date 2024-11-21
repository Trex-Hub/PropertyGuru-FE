'use client';
import { useCallback, useEffect, useState } from 'react';
import { GoGlobe } from 'react-icons/go';
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowUp } from 'react-icons/io';
import LanguagePopup from '../LanguagePopup';
import { getItem } from '@/utils/storageHelper';
import { AreaSystem } from '@/utils/constants';
import ContactUsPopupForm from '../ContactUsPopupForm';
import { Button } from '../ui/button';

export default function StickyButton() {
  const [isLanguagePopupOpen, setLanguagePopupOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleLanguagePopup = useCallback(() => {
    setLanguagePopupOpen(prevState => !prevState);
  }, []);
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className='md:flex hidden'>
        <div className='fixed bottom-10 md:bottom-4 left-4 z-50'>
          <div
            className='rounded-[1.25rem] bg-primary-settingsBackgroundColor cursor-pointer border border-primary-dividerColor shadow-xl'
            onClick={toggleLanguagePopup}
            role='button'
            tabIndex={0}
            onKeyDown={toggleLanguagePopup}>
            <div className='flex gap-2 items-center justify-center px-2 py-[0.375rem]'>
              <GoGlobe className='text-primary-secondaryTextColor' />
              <div className='text-xs font-normal text-primary-secondaryTextColor flex-row'>
                EN | AED |{' '}
                {getItem('areaSystem') === AreaSystem.SQUARE_METRES
                  ? 'm²'
                  : 'ft²'}
              </div>
              <IoIosArrowDown className='text-primary-textColor cursor-pointer text-sm' />
            </div>
          </div>
        </div>
        <div className='fixed bottom-10 md:bottom-4 right-4 z-50'>
          <div className='flex flex-row gap-2'>
            <ContactUsPopupForm />
            <div
              className='flex items-center justify-center bg-primary-stickyIconBackground h-9 w-9 rounded-lg shadow-xl'
              onClick={scrollToTop}
              onKeyDown={scrollToTop}
              tabIndex={0}
              role='button'>
              <IoMdArrowUp className='text-primary-secondaryTextColor text-base text-center' />
            </div>
          </div>
        </div>
        {isLanguagePopupOpen && (
          <LanguagePopup
            handleModalToggle={toggleLanguagePopup}
            popupPosition='bottom-8 left-4'
          />
        )}
      </div>
      <div className='md:hidden'>
        <div className='pt-[4.5rem]' />
        <div className='fixed bottom-0 left-0 right-0 bg-primary-labelColor h-[4.5rem] z-50 flex items-center'>
          <div className='flex justify-between w-full mx-3 items-center h-full'>
            <Button
              onClick={toggleLanguagePopup}
              onKeyDown={toggleLanguagePopup}
              variant={'ghost'}
              className='bg-white'>
              <div className='flex gap-2 items-center justify-center px-2 py-[0.375rem]'>
                <GoGlobe className='text-primary-secondaryTextColor' />
                <div className='text-xs font-normal text-primary-secondaryTextColor flex-row'>
                  EN | AED |{' '}
                  {getItem('areaSystem') === AreaSystem.SQUARE_METRES
                    ? 'm²'
                    : 'ft²'}
                </div>
                <IoIosArrowUp className='text-primary-textColor cursor-pointer text-sm' />
              </div>
            </Button>
            <div className='flex flex-row gap-2'>
              <ContactUsPopupForm />
              <div
                className='flex items-center justify-center bg-primary-stickyIconBackground h-9 w-9 rounded-lg shadow-xl'
                onClick={scrollToTop}
                onKeyDown={scrollToTop}
                tabIndex={0}
                role='button'>
                <IoMdArrowUp className='text-primary-secondaryTextColor text-base text-center' />
              </div>
            </div>
            {isLanguagePopupOpen && (
              <LanguagePopup
                handleModalToggle={toggleLanguagePopup}
                popupPosition='bottom-8 left-4'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
