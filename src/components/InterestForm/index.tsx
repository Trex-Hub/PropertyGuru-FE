'use client';
import { Button } from '@nextui-org/react';
import { RxCross2 } from 'react-icons/rx';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCallback, useEffect, useState } from 'react';
import {
  MAX_VALUE,
  MIN_VALUE,
  NO_SELECTION,
  PRICE_RANGES_INTEREST_FORM,
  readinessOptions,
} from '@/utils/constants';
import { IoIosArrowDown } from 'react-icons/io';
import {
  getAllAmenities,
  getAllAreas,
  getAllCities,
  getAllCitiesAreas,
  getAllPropertyTypes,
} from '@/services/properties';
import { getUniqueDevelopers } from '@/services/developers';
import logger from '@/utils/logger';
import { ellipsesText } from '@/utils/utilities';
import { FormikHelpers, useFormik } from 'formik';
import { InterestFormData } from '@/models/interest-form';
import { interestFormSchema } from '@/utils/validation-schemas';
import { ResponseStatusEnum } from '@/models/common';
import { toast } from '../ui/use-toast';
import {
  createInterestForm,
  getInterestFormForUser,
  updateInterestForm,
} from '@/services/interest-form';
import { useUser } from '@/contexts/UserContext';
import { getItem } from '@/utils/storageHelper';
import useScrollLock from '@/hooks/useScrollLock';

type InterestFormProps = {
  handleModalToggle: () => void;
};
interface CityArea {
  city: string;
  areas: string[];
}
const InterestForm: React.FC<InterestFormProps> = ({ handleModalToggle }) => {
  const [readiness, setReadiness] = useState('');
  const [minValue, setMinValue] = useState(MIN_VALUE);
  const [maxValue, setMaxValue] = useState(MAX_VALUE);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openPropertyType, setOpenPropertyType] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);
  const [openAmenities, setOpenAmenities] = useState(false);
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [areasList, setAreasList] = useState([]);
  const [citiesAreasList, setCitiesAreasList] = useState([]);
  const [developersList, setDevelopersList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const { userDetails } = useUser();
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [openPriceRange, setOpenPriceRange] = useState(false);
  const [interestFormData, setInterestFormData] = useState<InterestFormData>({
    city: 'Dubai',
    location: '',
    minPrice: MIN_VALUE,
    maxPrice: MAX_VALUE,
    developer: '',
    propertyType: '',
    readiness: '',
    bedroom: '',
    username: userDetails?.username,
    amenities: '',
  });

  const formatSelectedRanges = useCallback(() => {
    if (selectedPriceRanges.length === 0) return 'Price Range';
    if (selectedPriceRanges.length === 1) {
      return `${selectedPriceRanges.length} range selected`;
    }
    return `${selectedPriceRanges.length} ranges selected`;
  }, [selectedPriceRanges]);

  const [editId, setEditId] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: propertyTypeData },
          { data: citiesData },
          { data: areasData },
          { data: citiesAreasData },
          { data: developersData },
          { data: featuresData },
        ] = await Promise.all([
          getAllPropertyTypes(),
          getAllCities(),
          getAllAreas(),
          getAllCitiesAreas(),
          getUniqueDevelopers(),
          getAllAmenities(),
        ]);
        setPropertyTypeList(propertyTypeData);
        setCitiesList(citiesData);
        setAreasList(areasData);
        setCitiesAreasList(citiesAreasData);
        setDevelopersList(developersData);
        setAmenitiesList(featuresData);

        const { data: fetchedInterestFormData, status: interestFormStatus } =
          await getInterestFormForUser(userDetails?.username);

        if (interestFormStatus === ResponseStatusEnum.SUCCESS) {
          if (fetchedInterestFormData?.data?.length > 0) {
            const data = fetchedInterestFormData?.data?.[0]?.attributes;
            setEditId(fetchedInterestFormData?.data?.[0]?.id);
            setInterestFormData(fetchedInterestFormData?.data?.[0]?.attributes);
            setSelectedCity(data?.city || '');
            setSelectedLocation(data?.location || '');
            setMinValue(data?.minPrice || MIN_VALUE);
            setMaxValue(data?.maxPrice || MAX_VALUE);
            setSelectedDeveloper(data?.developer || '');
            setSelectedPropertyType(data?.propertyType || '');
            setReadiness(data?.readiness || '');
            setSelectedAmenities(data?.amenities.split(',') || []);
            const initialRanges = PRICE_RANGES_INTEREST_FORM.reduce(
              (acc: number[], range, index) => {
                if (
                  data?.minPrice <= range.min &&
                  data?.maxPrice >= range.max
                ) {
                  acc.push(index);
                }
                return acc;
              },
              []
            );
            setSelectedPriceRanges(initialRanges);
          }
        }
      } catch (error) {
        logger.error(error);
      }
    };

    fetchData();
  }, [userDetails?.id]);

  const formik = useFormik<InterestFormData>({
    initialValues: {
      city: interestFormData?.city || '',
      location: interestFormData?.location || '',
      minPrice: interestFormData?.minPrice || MIN_VALUE,
      maxPrice: interestFormData?.maxPrice || MAX_VALUE,
      developer: interestFormData?.developer || '',
      propertyType: interestFormData?.propertyType || '',
      readiness: interestFormData?.readiness || '',
      bedroom: interestFormData?.bedroom || '',
      username: userDetails?.username,
      amenities: interestFormData?.amenities || '',
    },
    enableReinitialize: true,
    validationSchema: interestFormSchema,
    onSubmit: async (
      values: InterestFormData,
      { resetForm }: FormikHelpers<InterestFormData>
    ) => {
      if (editId) {
        const { status, data, error } = await updateInterestForm(
          editId,
          values,
          getItem('token') || ''
        );
        if (status === ResponseStatusEnum.SUCCESS) {
          resetForm();
          handleModalToggle();
          toast({
            title: data,
            variant: 'default',
          });
          return;
        }
        toast({
          title: error,
          variant: 'destructive',
        });
      } else {
        const { status, data, error } = await createInterestForm(
          values,
          getItem('token') || ''
        );
        if (status === ResponseStatusEnum.SUCCESS) {
          resetForm();
          handleModalToggle();
          toast({
            title: data,
            variant: 'default',
          });
          return;
        }
        toast({
          title: error,
          variant: 'destructive',
        });
      }
    },
  });

  const handleCitySelect = useCallback(
    (city: string) => () => {
      setSelectedCity(city);
      setSelectedLocation('');
      formik.setFieldValue('city', city);
    },
    []
  );
  const handleLocationSelect = useCallback(
    (location: string) => () => {
      setSelectedLocation(location);
      formik.setFieldValue('location', location);
    },
    []
  );
  const handleDeveloperSelect = useCallback(
    (developerTitle: string) => () => {
      setSelectedDeveloper(developerTitle);
      formik.setFieldValue('developer', developerTitle);
    },
    []
  );
  const handlePropertyTypeSelect = useCallback(
    (propertyType: string) => () => {
      setSelectedPropertyType(propertyType);
      formik.setFieldValue('propertyType', propertyType);
    },

    []
  );
  const handleReadinessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue('readiness', e.target.value);
      setReadiness(e.target.value);
    },
    []
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value;
      formik.handleChange;
      setSearchTerm(newSearchTerm);
    },
    [setSearchTerm]
  );
  const handleSkipForNow = useCallback(() => {
    localStorage.setItem('skipInterestForm', 'true');
    handleModalToggle();
  }, [handleModalToggle]);

  const handleCheckedChange = useCallback(
    (amenity: string, checked: boolean) => {
      setSelectedAmenities(prev => {
        const updatedAmenities = checked
          ? [...prev, amenity]
          : prev.filter(item => item !== amenity);

        formik.setFieldValue('amenities', updatedAmenities.join(', '));
        return updatedAmenities;
      });
    },
    []
  );
  const handleOpenPriceRangeChange = useCallback((open: boolean) => {
    setOpenPriceRange(open);
  }, []);

  const getAreasForCity = useCallback(() => {
    if (!selectedCity || selectedCity === NO_SELECTION) {
      return areasList;
    }

    const cityData = citiesAreasList.find(
      (cityArea: CityArea) => cityArea.city === selectedCity
    ) as CityArea | undefined;

    return cityData ? cityData.areas : [];
  }, [selectedCity, areasList, citiesAreasList]);

  const handleOpenPropertyTypeChange = useCallback((open: boolean) => {
    setOpenPropertyType(open);
  }, []);

  const handleOpenCityChange = useCallback((openCity: boolean) => {
    setOpenCity(openCity);
  }, []);
  const handleOpenDeveloperChange = useCallback((open: boolean) => {
    setOpenDeveloper(open);
  }, []);
  const handleOpenAmenitiesChange = useCallback((open: boolean) => {
    setOpenAmenities(open);
  }, []);
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
  }, []);

  const handleOpenLocationChange = useCallback((open: boolean) => {
    setOpenLocation(open);
  }, []);
  const handleTriggerClick = useCallback(
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setter(prev => !prev);
    },
    []
  );
  const closePopupOnOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === 'popup-overlay') {
        localStorage.setItem('skipInterestForm', 'true');
        handleModalToggle();
      }
    },
    [handleModalToggle]
  );
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closePopupOnOutsideClick(e);
      }
    },
    [closePopupOnOutsideClick]
  );
  const filteredAreas = getAreasForCity()?.filter(area =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useScrollLock(true);

  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className='bg-white rounded-3xl py-8 px-6 shadow-xl relative w-80 md:w-[27rem] max-h-[93vh] overflow-y-hidden cursor-default'>
        <div className='flex justify-between items-center mb-6'>
          <p className='text-lg font-bold hover:cursor-default'>
            Register Your Interest
          </p>
          <RxCross2
            onClick={handleSkipForNow}
            role='button'
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className='text-xl cursor-pointer'
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className='max-h-[calc(100vh-10rem)] xl:h-auto overflow-y-auto pr-2'>
          <div className='mb-4 flex flex-col gap-4'>
            <DropdownMenu open={openCity} onOpenChange={handleOpenCityChange}>
              <div className='relative w-full '>
                <DropdownMenuTrigger
                  asChild
                  onPointerDown={handlePointerDown}
                  onClick={handleTriggerClick(setOpenCity)}>
                  <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg  px-4 py-2 h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
                    {(selectedCity === NO_SELECTION ? 'City' : selectedCity) ||
                      'City'}
                    <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-dropdown-menu-content-available-height] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg overflow-y-auto'>
                  {citiesList &&
                    citiesList?.length > 0 &&
                    citiesList.map((city: string, index: number) => (
                      <DropdownMenuItem
                        key={city + index}
                        onClick={handleCitySelect(city)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer w-full'>
                        {city}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
            <DropdownMenu
              open={openLocation}
              onOpenChange={handleOpenLocationChange}>
              <div className='relative w-full mt-2 lg:mt-0'>
                <DropdownMenuTrigger
                  asChild
                  onPointerDown={handlePointerDown}
                  onClick={handleTriggerClick(setOpenLocation)}>
                  <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg  px-4 py-2 h-[3rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between'>
                    {(selectedLocation === NO_SELECTION
                      ? 'Enter Location'
                      : selectedLocation) || 'Enter Location'}
                    <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-full mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg max-h-[15rem] overflow-y-auto w-[--radix-dropdown-menu-trigger-width]'>
                  <div className='p-2'>
                    <input
                      type='text'
                      className='w-full px-3 py-2 border rounded-md focus:outline-none'
                      placeholder='Search...'
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {filteredAreas?.map((area: string, index: number) => (
                    <DropdownMenuItem
                      key={area + index}
                      onClick={handleLocationSelect(area)}
                      className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                      {area}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
            {/* This is to fix the lint error. */}
            <div className='hidden'>
              Existing Range ${minValue} - ${maxValue}
            </div>
            <DropdownMenu
              open={openPriceRange}
              onOpenChange={handleOpenPriceRangeChange}>
              <div className='relative w-full mt-2 lg:mt-0'>
                <DropdownMenuTrigger
                  asChild
                  onPointerDown={handlePointerDown}
                  className='w-64'
                  onClick={handleTriggerClick(setOpenPriceRange)}>
                  <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg px-4 py-2 h-[3rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between'>
                    {formatSelectedRanges()}
                    <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-dropdown-menu-content-available-height] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg overflow-y-auto'>
                  {PRICE_RANGES_INTEREST_FORM.map((range, index) => (
                    <DropdownMenuItem
                      key={index}
                      className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'
                      onSelect={e => {
                        e.preventDefault();
                        setSelectedPriceRanges(prev => {
                          const isSelected = prev.includes(index);
                          const newRanges = isSelected
                            ? prev.filter(i => i !== index)
                            : [...prev, index];

                          // Calculate and update form values
                          if (newRanges.length > 0) {
                            const minPrice = Math.min(
                              ...newRanges.map(
                                i => PRICE_RANGES_INTEREST_FORM[i].min
                              )
                            );
                            const maxPrice = Math.max(
                              ...newRanges.map(
                                i => PRICE_RANGES_INTEREST_FORM[i].max
                              )
                            );
                            formik.setFieldValue('minPrice', minPrice);
                            formik.setFieldValue('maxPrice', maxPrice);
                          } else {
                            // Reset to default values if no ranges selected
                            formik.setFieldValue('minPrice', MIN_VALUE);
                            formik.setFieldValue('maxPrice', MAX_VALUE);
                          }

                          return newRanges;
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
            <DropdownMenu
              open={openDeveloper}
              onOpenChange={handleOpenDeveloperChange}>
              <div className='relative w-full'>
                <DropdownMenuTrigger
                  asChild
                  onPointerDown={handlePointerDown}
                  onClick={handleTriggerClick(setOpenDeveloper)}>
                  <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg  px-4 py-2 h-[3rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between'>
                    {(selectedDeveloper === NO_SELECTION
                      ? 'Developer'
                      : selectedDeveloper) || 'Developer'}
                    <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-dropdown-menu-content-available-height] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg overflow-y-auto'>
                  {developersList &&
                    developersList?.length > 0 &&
                    developersList.map((developers: string, index: number) => (
                      <DropdownMenuItem
                        key={developers + index}
                        onClick={handleDeveloperSelect(developers)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                        {developers}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
            <DropdownMenu
              open={openPropertyType}
              onOpenChange={handleOpenPropertyTypeChange}>
              <div className='relative w-full'>
                <DropdownMenuTrigger
                  asChild
                  onPointerDown={handlePointerDown}
                  onClick={handleTriggerClick(setOpenPropertyType)}>
                  <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg  px-4 py-2 h-[3rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between'>
                    {(selectedPropertyType === NO_SELECTION
                      ? 'Property Type'
                      : selectedPropertyType) || 'Property Type'}
                    <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-dropdown-menu-content-available-height] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg overflow-y-auto'>
                  {propertyTypeList && propertyTypeList.length > 0 ? (
                    propertyTypeList.map((propertyType, index) => (
                      <DropdownMenuItem
                        key={propertyType + index}
                        onClick={handlePropertyTypeSelect(propertyType)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                        {propertyType}
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
            <div className='w-full lg:w-[16.5rem] h-[3rem] rounded-lg flex items-center'>
              <div className='flex items-center ml-2 w-full'>
                <p className='font-primary text-sm text-primary-radioButtonTextColor'>
                  Readiness
                </p>
                <div className='flex ml-4 gap-2 sm:gap-10'>
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
                      onBlur={formik.handleBlur}
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
                      onBlur={formik.handleBlur}
                      className='mr-1 text-primary-labelColor'
                    />
                    {readinessOptions.OFF_PLAN}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <Input
              className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg  px-4 py-2 h-[3rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between
              focus-visible:ring-0 focus-visible:ring-offset-0 '
              placeholder='No. of Bedrooms'
              name='bedroom'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bedroom}
            />
            {formik.touched.bedroom && formik.errors.bedroom ? (
              <div className='text-red-500 text-xs'>
                {formik.errors.bedroom}
              </div>
            ) : null}
          </div>
          <div className='mb-4'>
            <DropdownMenu
              open={openAmenities}
              onOpenChange={handleOpenAmenitiesChange}>
              <div className='relative w-full'>
                <DropdownMenuTrigger asChild>
                  <button className='appearance-none border text-base border-primary-dropdownInputBorderColor w-full rounded-lg px-4 py-2 h-[3rem] text-primary-secondaryTextColor focus:outline-none flex items-center justify-between'>
                    {ellipsesText(selectedAmenities?.join(', '), 40) ||
                      'Select Amenities'}
                    <IoIosArrowDown className='text-primary-dropdownIconColor pointer-events-none' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='start'
                  side='bottom'
                  className='w-[--radix-dropdown-menu-trigger-width] max-h-[15rem] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-xl shadow-lg overflow-y-auto'>
                  {amenitiesList &&
                    amenitiesList.length > 0 &&
                    amenitiesList.map((amenity: string, index: number) => (
                      <DropdownMenuCheckboxItem
                        key={amenity + index}
                        checked={selectedAmenities.includes(amenity)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onCheckedChange={checked =>
                          handleCheckedChange(amenity, checked)
                        }
                        className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer flex items-center'>
                        <span className='ml-2'>{amenity}</span>
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>
          <Button
            type='submit'
            className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
            Submit
          </Button>
          <div
            className='text-primary-forgetPasswordTextColor font-primary text-sm justify-center flex items-center mt-4 underline cursor-pointer'
            onClick={handleSkipForNow}
            role='button'
            tabIndex={0}
            onKeyDown={handleSkipForNow}>
            Skip for now
          </div>
        </form>
      </div>
    </div>
  );
};
export default InterestForm;
