'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useLoading } from '@/contexts/LoadingContext';
import { cn } from '@/lib/utils';
import { getAllAmenities } from '@/services/properties';
import {
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  POSSESSION_OPTIONS,
} from '@/utils/constants';
import logger from '@/utils/logger';
import React, { useCallback, useEffect, useState } from 'react';
import { FiPieChart } from 'react-icons/fi';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { MdOutlineDiamond } from 'react-icons/md';
import { PiCopyLight } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

interface MoreFilterProps {
  isOpen: boolean;
  toggleModal: () => void;
  searchParams?: {
    minArea?: number;
    maxArea?: number;
    bedroom?: number | number[];
    bathroom?: number | number[];
    possession?: string | string[];
    amenity?: string | string[];
    keyword?: string;
  };
}

const MoreFilterPopup: React.FC<MoreFilterProps> = ({
  isOpen,
  toggleModal,
  searchParams = {},
}) => {
  const [showMore, setShowMore] = useState(false);
  const [minAreaValue, setMinArea] = useState<number>(0);
  const [maxAreaValue, setMaxArea] = useState<number>(0);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number[]>([]);
  const [selectedPossessions, setSelectedPossessions] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [amenitiesList, setAmenitiesList] = useState([]);
  const { setIsLoading } = useLoading();
  const {
    minArea = 0,
    maxArea = 0,
    bedroom = [],
    bathroom = [],
    possession = [],
    amenity = [],
    keyword: initialKeyword = '',
  } = searchParams;
  useEffect(() => {
    setMinArea(minArea || 0);
    setMaxArea(maxArea || 0);
    setSelectedBedrooms(
      Array.isArray(bedroom)
        ? bedroom.map(Number)
        : bedroom
          ? [Number(bedroom)]
          : []
    );
    setSelectedBathrooms(
      Array.isArray(bathroom)
        ? bathroom.map(Number)
        : bathroom
          ? [Number(bathroom)]
          : []
    );
    setSelectedPossessions(
      Array.isArray(possession) ? possession : possession ? [possession] : []
    );
    setSelectedAmenities(
      Array.isArray(amenity) ? amenity : amenity ? [amenity] : []
    );
    setKeyword(initialKeyword || '');
  }, [searchParams]);

  const handleAreaChange = useCallback(
    (setState: React.Dispatch<React.SetStateAction<number>>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(parseFloat(e.target.value) || 0);
      },
    []
  );
  const handleSelectBedroom = useCallback(
    (value: number) => () => {
      setSelectedBedrooms(prevSelected => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter(item => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    },
    []
  );
  const handleSelectBathroom = useCallback(
    (value: number) => () => {
      setSelectedBathrooms(prevSelected => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter(item => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    },
    []
  );
  const handleSelectAmenities = useCallback(
    (value: string) => () => {
      setSelectedAmenities(prevSelected => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter(item => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    },
    []
  );
  const handleSelectPossession = useCallback(
    (value: string) => () => {
      setSelectedPossessions(prevSelected => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter(item => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    },
    []
  );
  const handleKeywordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  const handleShowMore = useCallback(
    (value: boolean) => () => {
      setShowMore(value);
    },
    []
  );
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const { data } = await getAllAmenities();
        setAmenitiesList(data);
      } catch (error) {
        logger.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, []);

  const handleApplyFilters = useCallback(() => {
    setIsLoading(true);
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);

    const appendUnique = (key: string, value: string | number) => {
      const existingValues = queryParams.getAll(key);
      if (!existingValues.includes(value.toString())) {
        queryParams.append(key, value.toString());
      }
    };

    const removeIfExists = (key: string, value: string | number) => {
      const existingValues = queryParams.getAll(key);
      if (existingValues.includes(value.toString())) {
        const updatedValues = existingValues.filter(
          v => v !== value.toString()
        );
        if (updatedValues.length === 0) {
          queryParams.delete(key);
        } else {
          queryParams.set(key, updatedValues.join(','));
        }
      }
    };

    if (!queryParams.has('page')) {
      queryParams.set('page', '1');
    } else {
      queryParams.set('page', '1');
    }

    if (minAreaValue) {
      queryParams.set('minArea', minAreaValue.toString());
    } else {
      queryParams.delete('minArea');
    }
    if (maxAreaValue) {
      queryParams.set('maxArea', maxAreaValue.toString());
    } else {
      queryParams.delete('maxArea');
    }

    selectedBedrooms.forEach(bedroom => appendUnique('bedroom', bedroom));
    BEDROOM_OPTIONS.forEach(option => {
      if (!selectedBedrooms.includes(option.value)) {
        removeIfExists('bedroom', option.value);
      }
    });

    selectedBathrooms.forEach(bathroom => appendUnique('bathroom', bathroom));
    BATHROOM_OPTIONS.forEach(option => {
      if (!selectedBathrooms.includes(option.value)) {
        removeIfExists('bathroom', option.value);
      }
    });

    selectedPossessions.forEach(possession =>
      appendUnique('possession', possession)
    );
    POSSESSION_OPTIONS.forEach(option => {
      if (!selectedPossessions.includes(option.label)) {
        removeIfExists('possession', option.label);
      }
    });

    selectedAmenities.forEach(amenity => appendUnique('amenity', amenity));
    amenitiesList.forEach(value => {
      if (!selectedAmenities.includes(value)) {
        removeIfExists('amenity', value);
      }
    });
    if (keyword) {
      queryParams.set('keyword', keyword);
    } else {
      queryParams.delete('keyword');
    }

    const updatedUrl = `${url.origin}${url.pathname}?${queryParams.toString()}`;

    window.location.href = updatedUrl;
  }, [
    minAreaValue,
    maxAreaValue,
    selectedBedrooms,
    selectedBathrooms,
    selectedPossessions,
    selectedAmenities,
    keyword,
  ]);

  const clearAllFilters = useCallback(() => {
    setMinArea(0);
    setMaxArea(0);
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setSelectedPossessions([]);
    setSelectedAmenities([]);
    setKeyword('');

    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);

    queryParams.delete('minArea');
    queryParams.delete('maxArea');
    queryParams.delete('bedroom');
    queryParams.delete('bathroom');
    queryParams.delete('possession');
    queryParams.delete('amenity');
    queryParams.delete('keyword');

    const updatedUrl = `${url.origin}${url.pathname}?${queryParams.toString()}`;

    window.history.pushState({}, '', updatedUrl);
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading, handleApplyFilters, clearAllFilters]);
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2'>
      <div className='bg-white rounded-3xl shadow-lg w-full max-w-md font-primary h-[90vh] overflow-y-auto '>
        <div className='flex py-4 px-3 justify-between border-b shadow-md'>
          <p className='text-base font-bold'>More Filters</p>
          <RxCross2 className='self-end cursor-pointer' onClick={toggleModal} />
        </div>
        <div className='flex p-5 flex-col gap-5'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-5'>
              <PiCopyLight className='text-primary-primaryTextColor text-base' />
              <p className='text-base font-bold text-primary-primaryTextColor'>
                Area (ft<sup>2</sup>)
              </p>
            </div>
            <div className='flex gap-4 text-primary-primaryTextColor mb-5'>
              <Input
                className='rounded-[0.625rem] text-[0.688rem] lg:w-[5.688rem] lg:h-[1.5rem] border-primary-dropdownIconColor'
                type='text'
                placeholder='Min. area'
                value={minAreaValue}
                onChange={handleAreaChange(setMinArea)}
              />
              -
              <Input
                className='rounded-[0.625rem] text-[0.688rem] lg:w-[5.688rem] lg:h-[1.5rem]  border-primary-dropdownIconColor'
                type='text'
                placeholder='Max. area'
                value={maxAreaValue}
                onChange={handleAreaChange(setMaxArea)}
              />
            </div>
            <div className='border border-primary-moreFilterDividerColor'></div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-5'>
              <IoBedOutline className='text-primary-primaryTextColor text-base' />
              <p className='text-base font-bold text-primary-primaryTextColor'>
                Bedroom
              </p>
            </div>
            <div className='flex gap-4 text-primary-dropdownIconColor mb-5'>
              {BEDROOM_OPTIONS.map(option => (
                <div
                  key={option.value}
                  className={cn(
                    'border border-primary-dropdownIconColor rounded-sm hover:bg-primary-moreFilterBackgroundColor',
                    {
                      'bg-primary-moreFilterBackgroundColor':
                        selectedBedrooms.includes(option.value),
                    }
                  )}
                  onClick={handleSelectBedroom(option.value)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={handleSelectBedroom(option.value)}>
                  <p
                    className={cn(
                      'text-[0.688rem] px-[0.56rem] py-1 hover:text-primary-primaryTextColor',
                      {
                        'text-primary-primaryTextColor':
                          selectedBedrooms.includes(option.value),
                      }
                    )}>
                    {option.value}
                  </p>
                </div>
              ))}
            </div>
            <div className='border border-primary-moreFilterDividerColor'></div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-5'>
              <LuBath className='text-primary-primaryTextColor text-base' />
              <p className='text-base font-bold text-primary-primaryTextColor'>
                Bathroom
              </p>
            </div>
            <div className='flex gap-4 text-primary-dropdownIconColor mb-5'>
              {BATHROOM_OPTIONS.map(option => (
                <div
                  key={option.value}
                  className={cn(
                    'border border-primary-dropdownIconColor rounded-sm hover:bg-primary-moreFilterBackgroundColor',
                    {
                      'bg-primary-moreFilterBackgroundColor':
                        selectedBathrooms.includes(option.value),
                    }
                  )}
                  onClick={handleSelectBathroom(option.value)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={handleSelectBathroom(option.value)}>
                  <p
                    className={cn(
                      'text-[0.688rem] px-[0.56rem] py-1 hover:text-primary-primaryTextColor',
                      {
                        'text-primary-primaryTextColor':
                          selectedBathrooms.includes(option.value),
                      }
                    )}>
                    {' '}
                    {option.value}
                  </p>
                </div>
              ))}
            </div>
            <div className='border border-primary-moreFilterDividerColor'></div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-5'>
              <FiPieChart className='text-primary-primaryTextColor text-base' />
              <p className='text-base font-bold text-primary-primaryTextColor'>
                Possession status
              </p>
            </div>
            <div className='flex flex-col justify-between text-primary-dropdownIconColor mb-5 pl-2 pr-28'>
              {POSSESSION_OPTIONS.map(option => (
                <div
                  key={option.value}
                  className='flex items-center space-x-2 mb-4'
                  onClick={handleSelectPossession(option.label)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={handleSelectPossession(option.label)}>
                  <Checkbox
                    id={option.value}
                    className='text-primary-dropdownIconColor'
                    checked={selectedPossessions.includes(option.label)}
                    onChange={handleSelectPossession(option.label)}
                  />
                  <label
                    htmlFor={option.value}
                    className='text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-primaryTextColor'>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className='border border-primary-moreFilterDividerColor'></div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-5'>
              <MdOutlineDiamond className='text-primary-primaryTextColor text-base' />
              <p className='text-base font-bold text-primary-primaryTextColor'>
                Amenities
              </p>
            </div>
            <div className='flex flex-col gap-4 text-primary-dropdownIconColor mb-5 pl-2 '>
              {showMore
                ? amenitiesList.map(value => (
                    <div
                      key={value}
                      className='flex items-center space-x-2'
                      onClick={handleSelectAmenities(value)}
                      role='button'
                      tabIndex={0}
                      onKeyDown={handleSelectAmenities(value)}>
                      <Checkbox
                        id={value}
                        className='text-primary-dropdownIconColor'
                        checked={selectedAmenities.includes(value)}
                        onChange={handleSelectAmenities(value)}
                      />
                      <label
                        htmlFor={value}
                        className='text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-primaryTextColor'>
                        {value}
                      </label>
                    </div>
                  ))
                : amenitiesList.slice(0, 8).map(value => (
                    <div
                      key={value}
                      className='flex items-center space-x-2'
                      onClick={handleSelectAmenities(value)}
                      role='button'
                      tabIndex={0}
                      onKeyDown={handleSelectAmenities(value)}>
                      <Checkbox
                        id={value}
                        className='text-primary-dropdownIconColor'
                        checked={selectedAmenities.includes(value)}
                        onChange={handleSelectAmenities(value)}
                      />
                      <label
                        htmlFor={value}
                        className='text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-primaryTextColor'>
                        {value}
                      </label>
                    </div>
                  ))}
              <div className='flex gap-1 items-center text-primary-primaryTextColor mt-1'>
                {showMore ? (
                  <div
                    className='flex items-center gap-1 cursor-pointer'
                    onClick={handleShowMore(false)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={handleShowMore(false)}>
                    <div className='text-base font-bold '>Show Less</div>
                    <GoChevronUp />
                  </div>
                ) : (
                  <div
                    className='flex items-center gap-1 cursor-pointer'
                    onClick={handleShowMore(true)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={handleShowMore(true)}>
                    <div className='text-base font-bold'>Show More</div>
                    <GoChevronDown />
                  </div>
                )}
              </div>
              <div className='border border-primary-moreFilterDividerColor'></div>
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-3 mb-5'>
                <RiSearchLine className='text-primary-primaryTextColor text-base' />
                <p className='text-base font-bold text-primary-primaryTextColor'>
                  Keywords
                </p>
              </div>
              <div className='flex justify-between text-primary-primaryTextColor mb-3 pl-1'>
                <Input
                  className='rounded-[0.625rem] text-base bg-primary-settingsBackgroundColor h-[2rem]'
                  placeholder='Enter keyword'
                  type='text'
                  value={keyword}
                  onChange={handleKeywordChange}
                />
              </div>
              <div className='border border-primary-moreFilterDividerColor'></div>
            </div>
          </div>
        </div>
        <div className='w-full bg-primary-settingsBackgroundColor sticky bottom-0'>
          <div className='px-7 py-4 flex justify-between items-center'>
            <div
              className='text-sm text-primary-textColor cursor-pointer'
              onClick={clearAllFilters}
              role='button'
              tabIndex={0}
              onKeyDown={clearAllFilters}>
              Clear all
            </div>
            <Button
              className='text-primary-whiteTextColor text-base font-bold bg-primary-labelColor px-9 cursor-pointer hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border'
              onClick={handleApplyFilters}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreFilterPopup;
