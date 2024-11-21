'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import MultiRangeSlider from 'multi-range-slider-react';
import { Button } from '@/components/ui/button';
import {
  MAX_VALUE,
  MIN_VALUE,
  NO_SELECTION,
  readinessOptions,
  ROUTE_OPTIONS,
} from '@/utils/constants';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSlugFromTitle } from '@/utils/utilities';
import { ChangeEvent } from 'react';
import { ellipsesText } from '@/utils/utilities';
import { OPTIONS } from '@/utils/constants';
import useKeyboardHandler from '@/hooks/useKeyboardHandler';
import { IoIosSearch } from 'react-icons/io';

type SearchBarClientProps = {
  searchParams: {
    city: string;
    area: string;
    developer: string;
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    readiness: string;
  };
  propertyTypeList: string[];
  citiesList: string[];
  areasList: string[];
  citiesAreasList: { city: string; areas: string[] }[];
  developersList: string[];
  params: {
    lang: string;
  };
};

export default function SearchBarClient({
  searchParams,
  citiesList,
  areasList,
  citiesAreasList,
  developersList,
  params,
}: SearchBarClientProps) {
  const { city, area, developer, propertyType, minPrice, maxPrice, readiness } =
    searchParams;
  const [minValue, setMinValue] = useState(minPrice || MIN_VALUE);
  const [maxValue, setMaxValue] = useState(maxPrice || MAX_VALUE);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    area || null
  );
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    developer || null
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [openCity, setOpenCity] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openPropertyType, setOpenPropertyType] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);
  const [openPriceRange, setOpenPriceRange] = useState(false);
  const [openReadiness, setOpenReadiness] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const locationRef = useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [developerSearchTerm, setDeveloperSearchTerm] = useState('');
  const [filteredDevelopers, setFilteredDevelopers] = useState<string[]>([]);
  const developerRef = useRef<HTMLInputElement>(null);
  const [focusedDeveloperIndex, setFocusedDeveloperIndex] = useState(-1);

  const handleInput = useCallback(
    (e: { minValue: number; maxValue: number }) => {
      setMinValue(e.minValue);
      setMaxValue(e.maxValue);
    },
    []
  );

  const handleCitySelect = useCallback(
    (city: string | null) => () => {
      setSelectedCity(city);
      setSelectedLocation('');
    },
    []
  );

  const handlePropertyTypeSelect = useCallback(
    (propertyType: string | null) => () =>
      setSelectedPropertyType(propertyType),
    []
  );

  const handleOptionSelect = useCallback(
    (option: string | null) => () => setSelectedOption(option),
    []
  );
  const queryParams = useMemo(
    () => ({
      city: selectedCity || city || '',
      area: selectedLocation || area || '',
      developer: selectedDeveloper || developer || '',
      propertyType: selectedPropertyType || propertyType || '',
      minPrice:
        minValue !== undefined && minValue !== null
          ? minValue
          : minPrice !== undefined && minPrice !== null
            ? minPrice
            : MIN_VALUE,
      maxPrice:
        minValue !== undefined && minValue !== null
          ? maxValue
          : maxPrice !== undefined && maxPrice !== null
            ? maxPrice
            : MAX_VALUE,
      readiness: selectedOption || readiness || '',
      page: 1,
    }),
    [
      selectedCity,
      city,
      selectedLocation,
      area,
      selectedDeveloper,
      developer,
      selectedPropertyType,
      propertyType,
      minValue,
      MIN_VALUE,
      maxValue,
      MAX_VALUE,
      selectedOption,
      readiness,
    ]
  );

  const queryString = useMemo(() => {
    return Object.keys(queryParams)
      .filter(key => queryParams[key as keyof typeof queryParams] !== '')
      .map(
        key =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key as keyof typeof queryParams])}`
      )
      .join('&');
  }, [queryParams]);

  const handleFindClick = useCallback(() => {
    setLoading(true);
    try {
      const path =
        window.location.pathname.split('/')[2] === ROUTE_OPTIONS.ADVANCED_SEARCH
          ? ROUTE_OPTIONS.ADVANCED_SEARCH
          : window.location.pathname.split('/')[2] === ROUTE_OPTIONS.DEVELOPERS
            ? `/${ROUTE_OPTIONS.ESTATE_DEVELOPER}/${getSlugFromTitle(selectedDeveloper ? selectedDeveloper : '')}`
            : ROUTE_OPTIONS.PROPERTY_LIST;
      if (window.location.pathname.split('/')[2] === ROUTE_OPTIONS.DEVELOPERS) {
        router.push(`/${params.lang}/${path}`);
      } else {
        router.push(`/${params.lang}/${path}?${queryString}`);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [queryString, params.lang]);

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

  const handleOpenLocationChange = useCallback(
    (open: boolean) => {
      setOpenLocation(open);
      if (!open) {
        setLocationSearchTerm('');
        setFilteredAreas(getAreasForCity());
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

  const handleOpenPriceRangeChange = useCallback((open: boolean) => {
    setOpenPriceRange(open);
  }, []);

  const handleOpenReadinessChange = useCallback((open: boolean) => {
    setOpenReadiness(open);
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
    <div className='flex flex-col w-full'>
      <div className='flex bg-primary-settingsBackgroundColor w-full lg:rounded-[1.25rem] h-[3rem] md:h-[4.75rem] lg:mb-5 mb-1 overflow-x-auto'>
        <div className='flex items-center px-5 py-3 font-primary lg:gap-6 gap-3 '>
          {/* City Dropdown */}
          <DropdownMenu open={openCity} onOpenChange={handleOpenCityChange}>
            <div className='relative'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenCity)}>
                <button className='w-full appearance-none border text-xs md:text-sm border-primary-dropdownIconColor bg-primary-backgroundColor rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'>
                  <div className='flex items-center justify-between w-full pr-10'>
                    <span>
                      {(selectedCity === NO_SELECTION
                        ? 'City'
                        : selectedCity) ||
                        (city === NO_SELECTION ? 'City' : city) ||
                        'City'}
                    </span>
                  </div>
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor ' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-full  max-h-[15rem] overflow-y-auto'>
                {citiesList &&
                  citiesList.length > 0 &&
                  citiesList.map(city => (
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

          {/* Location Dropdown */}
          <DropdownMenu
            open={openLocation}
            onOpenChange={handleOpenLocationChange}>
            <div className='relative min-w-[10rem]'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenLocation)}>
                <button className='appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor w-full rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
                  {ellipsesText(
                    (selectedLocation !== 'No selection' && selectedLocation) ||
                      (locationSearchTerm !== 'No selection' &&
                        locationSearchTerm) ||
                      'Enter Location',
                    15
                  )}
                  <IoIosSearch className='text-primary-dropdownIconColor pointer-events-none' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-full max-h-[15rem] overflow-y-auto'
                onKeyDown={handleKeyDownAreas}
                data-dropdown='location'>
                <div className='p-2'>
                  <input
                    ref={locationRef}
                    type='text'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none'
                    placeholder='Search locations...'
                    value={locationSearchTerm}
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
                    className={`px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer     ${
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

          {/* Price Range Dropdown */}
          <DropdownMenu
            open={openPriceRange}
            onOpenChange={handleOpenPriceRangeChange}>
            <div className='relative '>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenPriceRange)}>
                <button className='appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor w-full rounded-sm md:rounded-xl gap-10 px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
                  {minValue && maxValue
                    ? `AED ${minValue} - ${maxValue}`
                    : minPrice && maxPrice
                      ? `AED ${minPrice} - ${maxPrice}`
                      : 'AED 0 - 25,000,000'}
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-full md:w-[14rem]'>
                <DropdownMenuItem
                  className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor '
                  onSelect={e => e.preventDefault()}>
                  <div className='w-full pt-7 rounded-xl flex flex-col font-primary'>
                    <div className='flex justify-center items-center'>
                      <MultiRangeSlider
                        min={MIN_VALUE}
                        max={MAX_VALUE}
                        step={100}
                        minValue={minPrice || minValue}
                        maxValue={maxPrice || maxValue}
                        onInput={handleInput}
                        label='true'
                        ruler='true'
                        barInnerColor='#66B269'
                        barLeftColor='#8593A9'
                        barRightColor='#8593A9'
                        thumbLeftColor='#66B269'
                        thumbRightColor='#66B269'
                        className='h-4 w-full '
                        style={{
                          border: 'none',
                          boxShadow: 'none',
                          padding: '0.313rem 0.625rem',
                        }}
                      />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          {/* Developer Dropdown */}
          <DropdownMenu
            open={openDeveloper}
            onOpenChange={handleOpenDeveloperChange}>
            <div className='relative min-w-[10.5rem]'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenDeveloper)}>
                <button className='appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor w-full rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
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

          {/* Property Type Dropdown */}
          <DropdownMenu
            open={openPropertyType}
            onOpenChange={handleOpenPropertyTypeChange}>
            <div className='relative'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenPropertyType)}>
                <button className='appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor w-full rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
                  <div className='flex items-center justify-between w-full pr-10'>
                    <span>
                      {(selectedPropertyType === NO_SELECTION
                        ? 'Type'
                        : selectedPropertyType) ||
                        (propertyType === NO_SELECTION
                          ? 'Type'
                          : propertyType) ||
                        'Type'}
                    </span>
                  </div>
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-full  max-h-[15rem] overflow-y-auto'>
                {OPTIONS &&
                  OPTIONS.length > 0 &&
                  OPTIONS.map((option: { url: string; name: string }) => (
                    <DropdownMenuItem
                      key={option.name === 'All' ? NO_SELECTION : option.url}
                      onClick={handlePropertyTypeSelect(
                        option.name === 'All' ? NO_SELECTION : option.url
                      )}
                      className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                      {option.name === 'All' ? 'No Selection' : option.name}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          {/* Readiness Dropdown */}
          <DropdownMenu
            open={openReadiness}
            onOpenChange={handleOpenReadinessChange}>
            <div className='relative'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenReadiness)}>
                <button className='appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor w-full rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
                  <div className='flex items-center justify-between w-full pr-10'>
                    <span>
                      {(selectedOption === NO_SELECTION
                        ? 'Readiness'
                        : selectedOption) ||
                        (readiness === NO_SELECTION
                          ? 'Readiness'
                          : readiness) ||
                        'Readiness'}
                    </span>
                  </div>
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg w-full  max-h-[15rem] overflow-y-auto'>
                {Object.entries(readinessOptions).map(([key, name]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={handleOptionSelect(name)}
                    className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          {/* Find Button */}
          <Button
            className='md:w-[13.125rem] w-[10rem] h-[2rem] md:h-[3.25rem] bg-primary-labelColor text-primary-whiteTextColor hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border text-base '
            onClick={handleFindClick}
            disabled={loading}>
            {loading ? 'Loading...' : 'Find'}
          </Button>
        </div>
      </div>
    </div>
  );
}
