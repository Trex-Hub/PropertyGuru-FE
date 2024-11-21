'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import {
  MAX_VALUE,
  MIN_VALUE,
  NO_SELECTION,
  PRICE_RANGES,
  readinessOptions,
  ROUTE_OPTIONS,
} from '@/utils/constants';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSlugFromTitle } from '@/utils/utilities';
import { ChangeEvent } from 'react';
import { ellipsesText } from '@/utils/utilities';
import { OPTIONS } from '@/utils/constants';

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
  const [minValue] = useState(minPrice || MIN_VALUE);
  const [maxValue] = useState(maxPrice || MAX_VALUE);
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
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);

  const formatSelectedRanges = useCallback(() => {
    if (selectedPriceRanges.length === 0) return 'Property Value';
    if (selectedPriceRanges.length === 1) {
      return `${selectedPriceRanges.length} range selected`;
    }
    return `${selectedPriceRanges.length} ranges selected`;
  }, [selectedPriceRanges]);

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
        selectedPriceRanges.length > 0
          ? Math.min(...selectedPriceRanges.map(i => PRICE_RANGES[i].min))
          : MIN_VALUE,
      maxPrice:
        selectedPriceRanges.length > 0
          ? Math.max(
              ...selectedPriceRanges.map(i =>
                PRICE_RANGES[i].max === Infinity
                  ? PRICE_RANGES[i].max
                  : PRICE_RANGES[i].max
              )
            )
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
      selectedPriceRanges,
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

  const handleKeyDownAreas = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        e.preventDefault();
        setFocusedIndex(prevIndex => {
          const newIndex =
            prevIndex < filteredAreas.length - 1 ? prevIndex + 1 : prevIndex;
          focusSelectedLocationItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prevIndex => {
          if (prevIndex === 0) {
            locationRef.current?.focus();
            return -1;
          }
          const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
          focusSelectedLocationItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredAreas.length === 1) {
          const selectedArea = filteredAreas[0];
          setSelectedLocation(selectedArea);
          setLocationSearchTerm(selectedArea);
          setOpenLocation(false);
        } else if (focusedIndex !== -1) {
          const selectedArea = filteredAreas[focusedIndex];
          setSelectedLocation(selectedArea);
          setLocationSearchTerm(selectedArea);
          setOpenLocation(false);
        }
      }
    },
    [
      filteredAreas,
      focusedIndex,
      setSelectedLocation,
      setLocationSearchTerm,
      setOpenLocation,
    ]
  );

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

  const handleDeveloperKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        e.preventDefault();
        setFocusedDeveloperIndex(prevIndex => {
          const newIndex =
            prevIndex < filteredDevelopers.length - 1
              ? prevIndex + 1
              : prevIndex;
          focusSelectedDeveloperItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedDeveloperIndex(prevIndex => {
          if (prevIndex === 0) {
            developerRef.current?.focus();
            return -1;
          }
          const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
          focusSelectedDeveloperItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredDevelopers.length === 1) {
          const selectedDeveloper = filteredDevelopers[0];
          setSelectedDeveloper(selectedDeveloper);
          setDeveloperSearchTerm(selectedDeveloper);
          setOpenDeveloper(false);
        } else if (focusedDeveloperIndex !== -1) {
          const selectedDeveloper = filteredDevelopers[focusedDeveloperIndex];
          setSelectedDeveloper(selectedDeveloper);
          setDeveloperSearchTerm(selectedDeveloper);
          setOpenDeveloper(false);
        }
      }
    },
    [
      filteredDevelopers,
      focusedDeveloperIndex,
      setSelectedDeveloper,
      setDeveloperSearchTerm,
      setOpenDeveloper,
    ]
  );

  return (
    <div className='flex flex-col w-full'>
      <div className='flex bg-primary-settingsBackgroundColor w-full lg:rounded-[1.25rem] h-[3rem] md:h-[4.75rem] lg:mb-5 mb-1 overflow-x-auto'>
        <div className='flex items-center justify-center w-full py-3 font-primary lg:gap-6 gap-3 '>
          {/* City Dropdown */}
          <DropdownMenu open={openCity} onOpenChange={handleOpenCityChange}>
            <div className='relative'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick(setOpenCity)}>
                <button className='w-32 appearance-none border text-xs md:text-sm border-primary-dropdownIconColor bg-primary-backgroundColor rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold'>
                  <div className='flex items-center justify-center w-full px-2'>
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
              <DropdownMenuContent className='mt-2 w-[--radix-dropdown-menu-trigger-width] bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg max-h-[15rem] overflow-y-auto'>
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
                <button className='flex w-64 items-center justify-center gap-1 appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor text-center rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor'>
                  {ellipsesText(
                    selectedLocation || locationSearchTerm || 'Enter Location',
                    15
                  )}
                  <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='mt-2 w-[--radix-dropdown-menu-trigger-width] bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg max-h-[15rem] overflow-y-auto'
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
            <div className='relative w-[12rem]'>
              <DropdownMenuTrigger
                asChild
                onPointerDown={handlePointerDown}
                className='w-64'
                onClick={handleTriggerClick(setOpenPriceRange)}>
                <button className='flex items-center justify-center gap-2 appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor w-full rounded-sm md:rounded-xl px-6 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor w-[15rem]'>
                  {formatSelectedRanges()}
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg'>
                {PRICE_RANGES.map((range, index) => (
                  <DropdownMenuItem
                    key={index}
                    className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor'
                    onSelect={e => {
                      e.preventDefault();
                      setSelectedPriceRanges(prev => {
                        const isSelected = prev.includes(index);
                        if (isSelected) {
                          return prev.filter(i => i !== index);
                        }
                        return [...prev, index];
                      });
                    }}>
                    <div className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        checked={selectedPriceRanges.includes(index)}
                        // the empty onChange is needed because the value is controlled by the parent DropdownMenuItem.
                        onChange={() => {}}
                        className='h-4 w-4 rounded border-gray-300'
                      />
                      <span>{range.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
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
                <button className='flex w-64 items-center justify-center gap-2 appearance-none border text-xs md:text-sm font-semibold border-primary-dropdownIconColor bg-primary-backgroundColor rounded-sm md:rounded-xl px-2 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor'>
                  {selectedDeveloper || developerSearchTerm || 'Developer'}
                  <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg max-h-[15rem] overflow-y-auto'
                onKeyDown={handleDeveloperKeyDown}
                data-dropdown='developer'>
                <div className='p-2'>
                  <input
                    ref={developerRef}
                    type='text'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none'
                    placeholder='Search developers...'
                    value={developerSearchTerm}
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
                  <div className='flex items-center justify-center w-full px-4'>
                    <span>
                      {(selectedPropertyType === NO_SELECTION
                        ? 'Property Type'
                        : selectedPropertyType) ||
                        (propertyType === NO_SELECTION
                          ? 'Property Type'
                          : propertyType) ||
                        'Property Type'}
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
                  <div className='flex items-center justify-center w-full px-2'>
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
            className='bg-primary-labelColor text-primary-whiteTextColor px-12 py-4 hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border text-base '
            onClick={handleFindClick}
            disabled={loading}>
            {loading ? 'Loading...' : 'Find'}
          </Button>
        </div>
      </div>
    </div>
  );
}
