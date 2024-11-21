'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AreaSystem as AreaSystemConst,
  Currency as CurrencyConst,
  DistanceSystem as DistanceSystemConst,
  Language as LanguageConst,
} from '@/utils/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GoGlobe } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { PiMoney } from 'react-icons/pi';
import { FaArrowsAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { getItem, setItem } from '@/utils/storageHelper';

// Type definitions
type Language = string;
type Currency = string;
type AreaSystem = string;
type DistanceSystem = string;

type LanguagePopupProps = {
  handleModalToggle: () => void;
  popupPosition: string;
};

const LanguagePopup: React.FC<LanguagePopupProps> = ({
  handleModalToggle,
  popupPosition,
}) => {
  const [areaSystem, setAreaSystem] = useState<AreaSystem>(
    getItem('areaSystem') || AreaSystemConst.SQUARE_FEET
  );
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [distanceSystem, setDistanceSystem] = useState<DistanceSystem>(
    getItem('distanceSystem') || DistanceSystemConst.KILO_METERS
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    getItem('selectedLanguage') || LanguageConst.English
  );
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    getItem('selectedCurrency') || CurrencyConst.AED
  );
  const [isMounted, setIsMounted] = useState(false);

  const closePopupOnOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === 'popup-overlay') {
        handleModalToggle();
      }
    },
    [handleModalToggle]
  );

  const handleLanguageSelect = useCallback(
    (language: Language) => () => {
      setSelectedLanguage(language);
    },
    []
  );

  const handleCurrencySelect = useCallback(
    (currency: Currency) => () => {
      setSelectedCurrency(currency);
    },
    []
  );

  const handleAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAreaSystem(e.target.value);
      window.location.reload();
    },
    []
  );

  const handleDistanceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDistanceSystem(e.target.value);
    },
    []
  );
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closePopupOnOutsideClick(e);
      }
    },
    [closePopupOnOutsideClick]
  );
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
  }, []);

  const handleOpenLanguageChange = useCallback((open: boolean) => {
    setOpenLanguage(open);
  }, []);

  const handleOpenCurrencyChange = useCallback((open: boolean) => {
    setOpenCurrency(open);
  }, []);

  const handleTriggerClick = useCallback(
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setter(prev => !prev);
    },
    []
  );

  const saveSettings = useCallback(() => {
    setItem('selectedLanguage', selectedLanguage);
    setItem('selectedCurrency', selectedCurrency);
    setItem('areaSystem', areaSystem);
    setItem('distanceSystem', distanceSystem);
  }, [selectedLanguage, selectedCurrency, areaSystem, distanceSystem]);

  useEffect(() => {
    const storedLanguage = getItem('selectedLanguage');
    const storedCurrency = getItem('selectedCurrency');
    const storedAreaSystem = getItem('areaSystem');
    const storedDistanceSystem = getItem('distanceSystem');

    if (storedLanguage) setSelectedLanguage(storedLanguage as Language);
    if (storedCurrency) setSelectedCurrency(storedCurrency as Currency);
    if (storedAreaSystem) setAreaSystem(storedAreaSystem as AreaSystem);
    if (storedDistanceSystem)
      setDistanceSystem(storedDistanceSystem as DistanceSystem);
  }, []);

  useEffect(() => {
    saveSettings();
  }, [
    selectedLanguage,
    selectedCurrency,
    areaSystem,
    distanceSystem,
    saveSettings,
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-25'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div
        className={`absolute ${popupPosition} z-50 flex flex-col transition-transform transform bg-white border border-gray-200 rounded-lg p-4`}>
        <RxCross2
          className='self-end mb-2 cursor-pointer'
          onClick={handleModalToggle}
        />
        <div className='py-5 px-4'>
          <div className='flex flex-col md:flex-row font-primary md:gap-32 gap-5'>
            <div className='flex flex-col'>
              <div className='flex flex-row mb-4 gap-2 items-center'>
                <FaArrowsAlt className='text-primary-secondaryTextColor' />
                <div className='text-sm text-primary-secondaryTextColor'>
                  Area
                </div>
              </div>
              <div className='flex flex-col ml-1 gap-3'>
                <label
                  className={`flex text-base items-center font-medium ${
                    areaSystem === AreaSystemConst.SQUARE_FEET
                      ? 'text-primary-primaryTextColor'
                      : 'text-primary-secondaryTextColor'
                  }`}>
                  <input
                    type='radio'
                    value={AreaSystemConst.SQUARE_FEET}
                    checked={areaSystem === AreaSystemConst.SQUARE_FEET}
                    onChange={handleAreaChange}
                    className='mr-2 text-primary-labelColor'
                  />
                  {AreaSystemConst.SQUARE_FEET}
                </label>
                <label
                  className={`flex items-center text-base font-medium ${
                    areaSystem === AreaSystemConst.SQUARE_METRES
                      ? 'text-primary-primaryTextColor'
                      : 'text-primary-secondaryTextColor'
                  }`}>
                  <input
                    type='radio'
                    value={AreaSystemConst.SQUARE_METRES}
                    checked={areaSystem === AreaSystemConst.SQUARE_METRES}
                    onChange={handleAreaChange}
                    className='mr-2 text-primary-labelColor'
                  />
                  {AreaSystemConst.SQUARE_METRES}
                </label>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row mb-4 gap-2 items-center'>
                <FaArrowsAlt className='text-primary-secondaryTextColor' />
                <div className='text-sm text-primary-secondaryTextColor'>
                  Distance
                </div>
              </div>
              <div className='flex flex-col ml-1 gap-3'>
                <label
                  className={`flex text-base items-center font-medium ${
                    distanceSystem === DistanceSystemConst.KILO_METERS
                      ? 'text-primary-primaryTextColor'
                      : 'text-primary-secondaryTextColor'
                  }`}>
                  <input
                    type='radio'
                    value={DistanceSystemConst.KILO_METERS}
                    checked={distanceSystem === DistanceSystemConst.KILO_METERS}
                    onChange={handleDistanceChange}
                    className='mr-2 text-primary-labelColor'
                  />
                  {DistanceSystemConst.KILO_METERS}
                </label>
                <label
                  className={`flex items-center text-base font-medium ${
                    distanceSystem === DistanceSystemConst.MILES_FEET
                      ? 'text-primary-primaryTextColor'
                      : 'text-primary-secondaryTextColor'
                  }`}>
                  <input
                    type='radio'
                    value={DistanceSystemConst.MILES_FEET}
                    checked={distanceSystem === DistanceSystemConst.MILES_FEET}
                    onChange={handleDistanceChange}
                    className='mr-2 text-primary-labelColor'
                  />
                  {DistanceSystemConst.MILES_FEET}
                </label>
              </div>
            </div>
          </div>
          <hr className='border-t border-primary-dividerColor my-4' />
          <div className='flex flex-col gap-5 md:gap-8 md:flex-row'>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row gap-1 items-center'>
                <GoGlobe className='text-primary-secondaryTextColor text-xl' />
                <div className='text-primary-secondaryTextColor text-sm font-primary'>
                  Language
                </div>
              </div>
              <div className='mt-2'>
                <DropdownMenu
                  open={openLanguage}
                  onOpenChange={handleOpenLanguageChange}>
                  <div className='relative'>
                    <DropdownMenuTrigger
                      asChild
                      onPointerDown={handlePointerDown}
                      onClick={handleTriggerClick(setOpenLanguage)}>
                      <button className='appearance-none border text-base border-primary-dropdownInputBorderColor rounded-lg w-[14.75rem] px-4 py-2  focus:outline-none text-primary-primaryTextColorTextColor flex items-center justify-between'>
                        {selectedLanguage || 'Language'}
                        <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-[14.75rem]'>
                      {Object.values(LanguageConst).map(
                        language =>
                          language !== 'Arabic' && (
                            <DropdownMenuItem
                              key={language}
                              onClick={handleLanguageSelect(language)}
                              className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                              {language}
                            </DropdownMenuItem>
                          )
                      )}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row gap-1 items-center'>
                <PiMoney className='text-primary-secondaryTextColor text-xl' />
                <div className='text-primary-secondaryTextColor text-sm font-primary'>
                  Currency
                </div>
              </div>
              <div className='relative mt-2'>
                <DropdownMenu
                  open={openCurrency}
                  onOpenChange={handleOpenCurrencyChange}>
                  <div className='relative'>
                    <DropdownMenuTrigger
                      asChild
                      onPointerDown={handlePointerDown}
                      onClick={handleTriggerClick(setOpenCurrency)}>
                      <button className='appearance-none border text-base border-primary-dropdownInputBorderColor rounded-lg w-[14.75rem] px-4 py-2  focus:outline-none text-primary-primaryTextColorTextColor flex items-center justify-between'>
                        {selectedCurrency || 'Currency'}
                        <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=' mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-[14.75rem]'>
                      {Object.values(CurrencyConst).map(
                        (currency: Currency) => (
                          <DropdownMenuItem
                            key={currency}
                            onClick={handleCurrencySelect(currency)}
                            className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                            {currency}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LanguagePopup;
