'use client';
import {
  MAX_VALUE,
  MIN_VALUE,
  NO_SELECTION,
  readinessOptions,
} from '@/utils/constants';
import Image from 'next/image';
import { useCallback, useState, useRef, useEffect } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChangeEvent } from 'react';
import { OPTIONS } from '@/utils/constants';
import useKeyboardHandler from '@/hooks/useKeyboardHandler';
import { IoIosSearch } from 'react-icons/io';

type SearchBarContainerProps = {
  propertyTypeList: string[];
  citiesList: string[];
  areasList: string[];
  citiesAreasList: { city: string; areas: string[] }[];
  developersList: string[];
  params: {
    lang: string;
  };
};

export default function SearchBarContainerClient({
  citiesList,
  areasList,
  citiesAreasList,
  developersList,
  params,
}: SearchBarContainerProps) {
  const [readiness, setReadiness] = useState('');
  const [minValue, setMinValue] = useState(MIN_VALUE);
  const [maxValue, setMaxValue] = useState(MAX_VALUE);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openPropertyType, setOpenPropertyType] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);
  const router = useRouter();
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const locationRef = useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [developerSearchTerm, setDeveloperSearchTerm] = useState('');
  const [filteredDevelopers, setFilteredDevelopers] = useState<string[]>([]);
  const developerRef = useRef<HTMLInputElement>(null);
  const [focusedDeveloperIndex, setFocusedDeveloperIndex] = useState(-1);

  const handleReadinessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReadiness(e.target.value);
    },
    []
  );
  const handleInput = useCallback(
    (e: { minValue: number; maxValue: number }) => {
      setMinValue(e.minValue);
      setMaxValue(e.maxValue);
    },
    []
  );

  const handleCitySelect = useCallback(
    (city: string) => () => {
      setSelectedCity(city);
      setSelectedLocation('');
    },
    []
  );

  const handlePropertyTypeSelect = useCallback(
    (propertyType: string) => () => setSelectedPropertyType(propertyType),

    []
  );

  const handleFindClick = useCallback(() => {
    setLoading(true);
    const queryParams: {
      city?: string;
      area?: string;
      developer?: string;
      propertyType?: string;
      minPrice?: number;
      maxPrice?: number;
      readiness?: string;
      page: number;
    } = {
      page: 1,
    };

    if (selectedCity) {
      queryParams.city = selectedCity;
    }
    if (selectedLocation) {
      queryParams.area = selectedLocation;
    }
    if (selectedDeveloper) {
      queryParams.developer = selectedDeveloper;
    }
    if (readiness) {
      queryParams.readiness = readiness;
    }
    if (selectedPropertyType) {
      queryParams.propertyType = selectedPropertyType;
    }
    if (typeof minValue !== 'undefined') {
      queryParams.minPrice = minValue;
    }
    if (typeof maxValue !== 'undefined') {
      queryParams.maxPrice = maxValue;
    }

    const queryString = Object.keys(queryParams)
      .map(key => {
        const value = queryParams[key as keyof typeof queryParams];
        if (value !== undefined) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        }
        return undefined;
      })
      .filter(Boolean)
      .join('&');

    router.push(`/${params.lang}/advanced-search?${queryString}`);
  }, [
    selectedCity,
    selectedLocation,
    selectedDeveloper,
    selectedPropertyType,
    minValue,
    maxValue,
    readiness,
    router,
  ]);

  const getAreasForCity = useCallback(() => {
    if (!selectedCity || selectedCity === NO_SELECTION) {
      return areasList;
    }
    const cityData = citiesAreasList.find(
      cityArea => cityArea.city === selectedCity
    );
    return cityData ? cityData.areas : [];
  }, [selectedCity, areasList, citiesAreasList]);
  const handleOpenCityChange = useCallback((openCity: boolean) => {
    setOpenCity(openCity);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
  }, []);

  const handleOpenPropertyTypeChange = useCallback((open: boolean) => {
    setOpenPropertyType(open);
  }, []);

  const handleTriggerClick = useCallback(
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setter(prev => !prev);
    },
    []
  );
  const handleOpenLocationChange = useCallback(
    (open: boolean) => {
      setOpenLocation(open);
      if (!open) {
        setLocationSearchTerm('');
        setFilteredAreas(getAreasForCity());
        setFocusedIndex(-1);
      }
    },
    [getAreasForCity]
  );
  useEffect(() => {
    if (openLocation) {
      setFilteredAreas(getAreasForCity());
      requestAnimationFrame(() => {
        locationRef.current?.focus();
      });
    }
  }, [openLocation]);

  const handleLocationSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setLocationSearchTerm(value);
      setSelectedLocation(''); // Clear selected location when typing
      const filtered = getAreasForCity().filter(area =>
        area.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAreas(filtered);
    },
    [getAreasForCity]
  );

  const focusSelectedLocationItem = (index: number) => {
    const items = document.querySelectorAll(
      '[data-dropdown="location"] [role="menuitem"]'
    );
    if (items && items[index]) {
      (items[index] as HTMLElement).focus();
    }
  };

  const focusSelectedDeveloperItem = (index: number) => {
    const items = document.querySelectorAll(
      '[data-dropdown="developer"] [role="menuitem"]'
    );
    if (items && items[index]) {
      (items[index] as HTMLElement).focus();
    }
  };

  // Use the new createKeyboardHandler for areas
  const handleKeyDownAreas = useKeyboardHandler({
    filteredItems: filteredAreas,
    focusedIndex,
    setFocusedIndex,
    setSelectedItem: setSelectedLocation,
    setSearchTerm: setLocationSearchTerm,
    setOpen: setOpenLocation,
    focusSelectedItem: focusSelectedLocationItem,
    inputRef: locationRef,
  });

  const handleDeveloperSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setDeveloperSearchTerm(value);
      setSelectedDeveloper(''); // Clear selected developer when typing
      const filtered = developersList.filter(developer =>
        developer.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDevelopers(filtered);
    },
    [developersList]
  );

  const handleOpenDeveloperChange = useCallback(
    (open: boolean) => {
      setOpenDeveloper(open);
      if (!open) {
        setDeveloperSearchTerm('');
        setFilteredDevelopers(developersList);
        setFocusedDeveloperIndex(-1);
      }
    },
    [developersList]
  );

  useEffect(() => {
    if (openDeveloper) {
      setFilteredDevelopers(developersList);
      requestAnimationFrame(() => {
        developerRef.current?.focus();
      });
    }
  }, [openDeveloper, developersList]);

  // Use the new createKeyboardHandler for developers
  const handleDeveloperKeyDown = useKeyboardHandler({
    filteredItems: filteredDevelopers,
    focusedIndex: focusedDeveloperIndex,
    setFocusedIndex: setFocusedDeveloperIndex,
    setSelectedItem: setSelectedDeveloper,
    setSearchTerm: setDeveloperSearchTerm,
    setOpen: setOpenDeveloper,
    focusSelectedItem: focusSelectedDeveloperItem,
    inputRef: developerRef,
  });

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
          Your key to off-plan investments
        </h1>
      </div>
      <div className='flex flex-col absolute bottom-0 top-[75%] md:top-[68%] lg:top-[72%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[75%]'>
        <div className='bg-primary-backgroundColor rounded-[1.25rem] flex flex-col lg:flex-row mb-4 md:mb-0 shadow-lg'>
          <div className='w-full px-4 py-5 lg:px-8 lg:py-7 text-left font-secondary'>
            <p className='text-primary-textColor font-medium text-sm mb-4'>
              Your Search Criteria...
            </p>
            <div className='flex flex-col lg:flex-col xl:flex-row lg:justify-between mb-4 gap-4'>
              <div className='flex flex-col lg:flex-row w-full lg:w-auto'>
                <DropdownMenu
                  open={openCity}
                  onOpenChange={handleOpenCityChange}>
                  <div className='relative w-full lg:w-[10.5rem]'>
                    <DropdownMenuTrigger
                      asChild
                      onPointerDown={handlePointerDown}
                      onClick={handleTriggerClick(setOpenCity)}>
                      <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none px-4 py-2 h-[3.5rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
                        {(selectedCity === NO_SELECTION
                          ? 'City'
                          : selectedCity) || 'City'}
                        <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full lg:w-[10.5rem] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg  max-h-[15rem] overflow-y-auto'>
                      {citiesList &&
                        citiesList?.length > 0 &&
                        citiesList.map((city: string) => (
                          <DropdownMenuItem
                            key={city}
                            onClick={handleCitySelect(city)}
                            className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                            {city}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
                <DropdownMenu
                  open={openLocation}
                  onOpenChange={handleOpenLocationChange}>
                  <div className='relative w-full lg:w-[38.6875rem] mt-2 lg:mt-0'>
                    <DropdownMenuTrigger
                      asChild
                      onPointerDown={handlePointerDown}
                      onClick={handleTriggerClick(setOpenLocation)}>
                      <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg lg:rounded-r-lg lg:rounded-l-none px-4 py-2 h-[3.5rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between'>
                        {(selectedLocation !== 'No selection' &&
                          selectedLocation) ||
                          (locationSearchTerm !== 'No selection' &&
                            locationSearchTerm) ||
                          'Enter Location'}
                        <IoIosSearch className='text-primary-dropdownIconColor pointer-events-none' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className='w-full mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg lg:w-[38.6875rem] max-h-[15rem] overflow-y-auto'
                      onKeyDown={handleKeyDownAreas}
                      data-dropdown='location'>
                      <div className='p-2'>
                        <input
                          ref={locationRef}
                          type='text'
                          className='w-full px-3 py-2 border rounded-md focus:outline-none'
                          placeholder='Search locations...'
                          value={
                            locationSearchTerm !== 'No selection'
                              ? locationSearchTerm
                              : ''
                          }
                          onChange={handleLocationSearchChange}
                          onKeyDown={e => {
                            e.stopPropagation();
                            handleKeyDownAreas(e);
                          }}
                        />
                      </div>
                      {filteredAreas.map((area, index) => (
                        <DropdownMenuItem
                          key={area}
                          className={`px-4 py-2 text-primary-secondaryTextColor cursor-pointer
    ${
      index === focusedIndex
        ? 'bg-primary-dropdownFocusedColor'
        : 'hover:bg-primary-dropdownHoverColor'
    }`}
                          onSelect={() => {
                            setSelectedLocation(area);
                            setLocationSearchTerm(area);
                            setOpenLocation(false);
                          }}>
                          {area}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              </div>

              <div className='w-full lg:w-[20rem] rounded-xl flex flex-col font-primary'>
                <div className='flex flex-wrap justify-between px-2 py-2'>
                  <p className='text-sm text-primary-radioButtonTextColor'>
                    Price Range
                  </p>
                  <div className='flex gap-2 items-center'>
                    <p className='text-[0.625rem] text-primary-secondaryTextColor'>
                      AED
                    </p>
                    <p className='text-xs text-primary-primaryTextColor overflow-hidden'>
                      {minValue} - {maxValue}
                    </p>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <MultiRangeSlider
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    step={100}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={handleInput}
                    label='false'
                    ruler='false'
                    barInnerColor='#66B269'
                    barLeftColor='#8593A9'
                    barRightColor='#8593A9'
                    thumbLeftColor='#66B269'
                    thumbRightColor='#66B269'
                    className='h-4 w-full mx-4'
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      padding: '0.313rem 0.625rem',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 lg:flex-col xl:flex-row lg:justify-between xl:items-center font-primary'>
              <div className='flex flex-col lg:flex-row gap-3 items-center'>
                <DropdownMenu
                  open={openDeveloper}
                  onOpenChange={handleOpenDeveloperChange}>
                  <div className='relative w-full lg:w-[10.5rem]'>
                    <DropdownMenuTrigger
                      asChild
                      onPointerDown={handlePointerDown}
                      onClick={handleTriggerClick(setOpenDeveloper)}>
                      <button className='appearance-none bg-primary-iconBackgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex items-center justify-between'>
                        {(selectedDeveloper !== 'No selection' &&
                          selectedDeveloper) ||
                          (developerSearchTerm !== 'No selection' &&
                            developerSearchTerm) ||
                          'Developer'}
                        <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className='w-full lg:w-[12.5rem] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg max-h-[15rem] overflow-y-auto'
                      onKeyDown={handleDeveloperKeyDown}
                      data-dropdown='developer'>
                      <div className='p-2'>
                        <input
                          ref={developerRef}
                          type='text'
                          className='w-full px-3 py-2 border rounded-md focus:outline-none'
                          placeholder='Search developers...'
                          value={
                            developerSearchTerm !== 'No selection'
                              ? developerSearchTerm
                              : ''
                          }
                          onChange={handleDeveloperSearchChange}
                          onKeyDown={e => {
                            e.stopPropagation();
                            handleDeveloperKeyDown(e);
                          }}
                        />
                      </div>
                      {filteredDevelopers.map((developer, index) => (
                        <DropdownMenuItem
                          key={developer}
                          className={`px-4 py-2 text-primary-secondaryTextColor cursor-pointer
            ${
              index === focusedDeveloperIndex
                ? 'bg-primary-dropdownFocusedColor'
                : 'hover:bg-primary-dropdownHoverColor'
            }`}
                          onSelect={() => {
                            setSelectedDeveloper(developer);
                            setDeveloperSearchTerm(developer);
                            setOpenDeveloper(false);
                          }}>
                          {developer}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
                <DropdownMenu
                  open={openPropertyType}
                  onOpenChange={handleOpenPropertyTypeChange}>
                  <div className='relative w-full lg:w-[21.1875rem]'>
                    <DropdownMenuTrigger
                      asChild
                      onPointerDown={handlePointerDown}
                      onClick={handleTriggerClick(setOpenPropertyType)}>
                      <button className='appearance-none bg-primary-iconBackgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex items-center justify-between'>
                        {(selectedPropertyType === NO_SELECTION
                          ? 'Property Type'
                          : selectedPropertyType) || 'Property Type'}
                        <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg lg:w-[21.1875rem]  max-h-[15rem] overflow-y-auto'>
                      {OPTIONS && OPTIONS.length > 0 ? (
                        OPTIONS.map((option: { url: string; name: string }) => (
                          <DropdownMenuItem
                            key={option.url}
                            onClick={handlePropertyTypeSelect(option.url)}
                            className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                            {option.name === 'All'
                              ? 'No Selection'
                              : option.name}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className='px-4 py-2 text-primary-secondaryTextColor'>
                          No property types available.
                        </div>
                      )}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>

                <div className='w-full lg:w-[16.5rem] h-[3rem] bg-primary-iconBackgroundColor rounded-lg flex items-center'>
                  <div className='flex items-center px-4 w-full'>
                    <div className='flex ml-1 gap-5'>
                      <label
                        className={`flex items-center text-sm ${
                          readiness === readinessOptions.READY
                            ? 'text-primary-primaryTextColor'
                            : 'text-primary-secondaryTextColor'
                        }`}>
                        <input
                          type='radio'
                          value={readinessOptions.READY}
                          color='#3CBF58'
                          checked={readiness === readinessOptions.READY}
                          onChange={handleReadinessChange}
                          className='mr-1 text-primary-labelColor'
                        />
                        {readinessOptions.READY}
                      </label>
                      <label
                        className={`flex items-center text-sm ${
                          readiness === readinessOptions.OFF_PLAN
                            ? 'text-primary-primaryTextColor'
                            : 'text-primary-secondaryTextColor'
                        }`}>
                        <input
                          type='radio'
                          value={readinessOptions.OFF_PLAN}
                          color='#3CBF58'
                          checked={readiness === readinessOptions.OFF_PLAN}
                          onChange={handleReadinessChange}
                          className='mr-1 text-primary-labelColor'
                        />
                        {readinessOptions.OFF_PLAN}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleFindClick}
                disabled={loading}
                className='w-full lg:w-[20rem] h-[3.5rem] rounded-lg text-lg font-bold bg-primary-labelColor text-primary-whiteTextColor hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border '>
                {loading ? 'Loading...' : 'Find'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
