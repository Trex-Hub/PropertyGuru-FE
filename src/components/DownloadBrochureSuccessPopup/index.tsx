'use client';

import React, { useCallback } from 'react';
import { GoMail } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';

type DownloadBrochureSuccessPopupProps = {
  handleDownloadBrochureSuccessPopupToggle: () => void;
  userEmail: string;
};

const DownloadBrochureSuccessPopup: React.FC<
  DownloadBrochureSuccessPopupProps
> = ({ handleDownloadBrochureSuccessPopupToggle, userEmail }) => {
  const closePopupOnOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === 'popup-overlay') {
        handleDownloadBrochureSuccessPopupToggle();
      }
    },
    [handleDownloadBrochureSuccessPopupToggle]
  );
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closePopupOnOutsideClick(e);
      }
    },
    [closePopupOnOutsideClick]
  );
  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary p-6'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className='absolute z-50 flex flex-col transition-transform transform bg-white border border-gray-200 rounded-lg p-4 w-[18.75rem] md:w-[23rem] font-primary'>
        <RxCross2
          className='self-end my-2 cursor-pointer'
          onClick={handleDownloadBrochureSuccessPopupToggle}
        />
        <div className='flex flex-col items-center mt-2 px-2'>
          <GoMail className='text-[2.5rem] text-primary-textColor' />
        </div>
        <div className='flex flex-col justify-center items-center my-4 px-2'>
          <p className='md:text-2xl text-xl font-primary font-bold text-primary-primaryTextColor'>
            Your Inbox Awaits!
          </p>
          <p className='md:text-2xl text-xl font-primary font-bold text-primary-primaryTextColor'>
            Please Check Your Email
          </p>
        </div>
        <p className='md:text-lg text-base font-primary text-primary-secondaryTextColor items-center flex leading-[1.75rem] justify-center text-center px-2 mb-4'>
          We&apos;ve Sent the Brochure! Please Find it in Your Email at{' '}
          {userEmail}
        </p>
      </div>
    </div>
  );
};
export default DownloadBrochureSuccessPopup;
