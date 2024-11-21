'use client';
import Image from 'next/image';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosHeart,
  IoIosHeartEmpty,
} from 'react-icons/io';
import { CiLocationOn } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { FloorPlan, Property } from '@/models/property';
import { cn } from '@/lib/utils';
import {
  convertSquareFeetToSquareMeters,
  ellipsesText,
  getBackgroundColorClass,
} from '@/utils/utilities';
import ShareButton from '../ShareButton';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { AreaSystem, NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { getItem } from '@/utils/storageHelper';
import Link from 'next/link';
import { useWishListContext } from '@/contexts/WishlistContext';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '../ui/use-toast';
import LoginForm from '../LoginFormPopUp';
interface ListCardProps {
  property: Property;
  params: {
    lang: string;
  };
}

const HorizontalListCard: React.FC<ListCardProps> = ({ property, params }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<FloorPlan | null>(
    property?.attributes?.floorPlan[0]
  );
  const [areaText, setAreaText] = useState('N/A');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, setTriedToLogIn } = useUser();
  const toast = useToast();
  const token = getItem('token');
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const {
    title,
    location,
    features,
    slug,
    possessionStatus,
    floorPlan,
    image,
    developer,
    handover,
  } = property.attributes;

  const { wishListProperty, removeWishListProperty, wishListSlugObj } =
    useWishListContext();
  const isHeartFilled = useMemo(() => {
    return !!wishListSlugObj[property.attributes.slug];
  }, [wishListSlugObj]);
  const images = image?.data?.map(img => ({
    src: NEXT_PUBLIC_ASSETS_URL + img.attributes.url,
    alt: img.attributes.alternativeText,
    idx: img.id,
  })) || [{ src: '/property_2.svg', alt: 'property image', idx: 0 }];
  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  const toggleHeart = useCallback(async () => {
    if (isLoggedIn) {
      try {
        if (!isHeartFilled) {
          // Send POST request
          await wishListProperty(property.attributes.slug);
        } else {
          // Send DELETE request
          await removeWishListProperty(property.attributes.slug);
        }
      } catch (error) {
        toast.toast({
          title: 'Error updating wishlist',
          variant: 'destructive',
        });
      }
    } else {
      // setLoginPopupOpen(true);
    }
  }, [isLoggedIn, isHeartFilled, property.attributes.slug, token]);
  const closeLoginPopup = useCallback(() => {
    setLoginPopupOpen(false);
  }, []);

  const handleLoginSuccess = useCallback(async () => {
    setTriedToLogIn(true);
    //mark

    await wishListProperty(property.attributes.slug);
  }, [setTriedToLogIn]);

  const handleClick = useCallback(() => {
    setLoading(true);
    const url = `/${params?.lang}/properties/${slug}`;
    router.push(url);
  }, [router, slug]);
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prevState => !prevState);
  }, [setIsDropdownOpen]);

  const handleFloorPlanSelect = useCallback(
    (plan: FloorPlan) => () => {
      setSelectedFloorPlan(plan);
      setIsDropdownOpen(false);
    },
    [setSelectedFloorPlan, setIsDropdownOpen]
  );
  useEffect(() => {
    const areaSystem = getItem('areaSystem');
    if (areaSystem === AreaSystem.SQUARE_METRES) {
      setAreaText(
        selectedFloorPlan?.area !== undefined
          ? `${convertSquareFeetToSquareMeters(selectedFloorPlan.area)} m²`
          : 'N/A'
      );
    } else {
      setAreaText(
        selectedFloorPlan?.area !== undefined
          ? `${selectedFloorPlan.area} ft²`
          : 'N/A'
      );
    }
  }, [selectedFloorPlan]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='relative w-[53.5rem] flex'>
        <div className='relative h-full overflow-hidden rounded-l-[0.625rem] w-[23rem]'>
          <div className='w-[23rem] h-[15rem] mx-auto overflow-hidden'>
            {images.map((img: any, index: number) => (
              <div
                key={img.idx}
                className={cn(
                  'w-full h-full',
                  index === currentIndex ? 'block' : 'hidden'
                )}>
                <Image
                  width={300}
                  height={200}
                  alt={img.alt ?? 'Property Image'}
                  sizes='100vw'
                  src={img.src || ''}
                  className='w-full h-full object-cover transition-transform duration-1000 transform group-hover:scale-105'
                />
              </div>
            ))}
          </div>
          {possessionStatus === 'Pre Launch' ? (
            <div className='absolute top-6 left-[-6px] font-primary bg-primary-preLaunchFlagBackgroundColor text-xs font-semibold text-primary-whiteTextColor px-2 py-1 rounded-r-[20px] rounded-l-[4px] transform transition-transform duration-300 group-hover:-translate-y-1'>
              Pre Launch
            </div>
          ) : null}
          <div
            className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-primary-iconBackgroundColor bg-opacity-50 rounded-lg z-10 px-[0.5rem] py-[0.75rem]'
            onClick={handlePrev}
            onKeyDown={handlePrev}
            tabIndex={0}
            role='button'>
            <IoIosArrowBack className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
          </div>
          <div
            className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary-iconBackgroundColor bg-opacity-50 rounded-lg z-10 px-[0.5rem] py-[0.75rem]'
            onClick={handleNext}
            onKeyDown={handleNext}
            tabIndex={0}
            role='button'>
            <IoIosArrowForward className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
          </div>
        </div>
        <div className='flex flex-col flex-1 p-2 px-4 border border-primary-dropdownIconColor border-l-0 rounded-r-[0.625rem] font-primary'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-1 mb-2'>
              <CiLocationOn className='text-primary-secondaryTextColor text-lg md:text-xl' />
              <p className='text-[0.750rem] md:text-xs text-primary-titleTextColor'>
                {location?.area}, {location?.city}
              </p>
            </div>
            <div className='w-[5.375rem] h-[2.70rem]'>
              {developer?.data?.attributes?.logo?.data?.attributes?.url && (
                <Image
                  width={880}
                  height={240}
                  sizes='100vw'
                  className='w-[100%] h-[100%] object-contain'
                  alt='Developer Images'
                  src={`${NEXT_PUBLIC_ASSETS_URL}${developer?.data?.attributes?.logo?.data?.attributes?.url}`}
                />
              )}
            </div>
          </div>
          <Link
            href={`/${params?.lang}/properties/${slug}`}
            className='text-lg md:text-2xl font-bold text-primary-titleTextColor mb-1'>
            {ellipsesText(title, 35)}
          </Link>
          <div className='flex justify-between flex-col sm:flex-row '>
            <div
              className={cn(
                'rounded-3xl mb-1 sm:mb-3 inline-block max-w-max',
                getBackgroundColorClass(possessionStatus)
              )}>
              <p className='text-sm font-primary px-3 py-1'>
                {possessionStatus}
              </p>
            </div>
            <div className='sm:text-center mb-1 sm:mb-3'>
              <p className='text-primary-iconColor text-sm py-1 px-2  sm:px-0'>
                Delivery Date :{' '}
                <span className='font-semibold text-primary-radioButtonTextColor md:text-primary-textColor '>
                  {ellipsesText(handover, 15) || 'N/A'}
                </span>
              </p>
            </div>
          </div>
          <div
            className='flex items-center gap-2 mb-3 relative'
            onClick={toggleDropdown}
            onKeyDown={toggleDropdown}
            tabIndex={0}
            role='button'
            ref={dropdownRef}>
            <p className='text-primary-textGrayColor text-sm md:text-base font-semibold'>
              Type
            </p>
            <p className='text-primary-primaryTextColor text-xs md:text-sm font-semibold'>
              {selectedFloorPlan?.bedroom || 'N/A'} Bedroom
            </p>
            <p className='text-primary-textGrayColor text-sm md:text-base font-semibold'>
              |
            </p>
            <p className='text-primary-textGrayColor text-sm md:text-base font-semibold'>
              Area
            </p>
            <p className='text-primary-primaryTextColor text-xs md:text-sm font-semibold'>
              {areaText}
            </p>
            <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor cursor-pointer' />

            {isDropdownOpen && (
              <div className='absolute top-full left-0 mt-1 w-full  max-h-[6.1rem] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-50'>
                <div className='p-1'>
                  {floorPlan.map(plan => (
                    <div
                      key={plan.id}
                      onKeyDown={handleFloorPlanSelect(plan)}
                      tabIndex={0}
                      role='button'
                      className='p-1 px-2 cursor-pointer hover:bg-gray-100'
                      onClick={handleFloorPlanSelect(plan)}>
                      <div className='flex items-center gap-2'>
                        <p className='text-primary-textGrayColor text-sm md:text-base font-semibold'>
                          Type
                        </p>
                        <p className='text-primary-primaryTextColor text-xs md:text-sm font-semibold'>
                          {plan?.bedroom || 'N/A'} Bedroom
                        </p>
                        <p className='text-primary-textGrayColor text-sm md:text-base font-semibold'>
                          |
                        </p>
                        <p className='text-primary-textGrayColor text-sm md:text-base font-semibold'>
                          Area
                        </p>
                        <p className='text-primary-primaryTextColor text-xs md:text-sm font-semibold'>
                          {plan?.area || 'N/A'} ft²
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex mb-2 gap-2 overflow-x-auto max-w-full'>
            {features?.slice(0, 3).map(feature => (
              <div key={feature} className='flex gap-2 items-center'>
                <Image
                  src='/feature_icon.jpeg'
                  alt='Feature Icon'
                  width={20}
                  height={20}
                />
                <p className='text-xs md:text-sm text-primary-primaryTextColor'>
                  {ellipsesText(feature, 18)}
                </p>
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center '>
            <Link
              href={`/${params?.lang}/properties/${slug}`}
              className='text-primary-loginTextColor border text-sm border-primary-loginBorder bg-primary-backgroundColor hover:bg-primary-labelColor hover:text-primary-whiteTextColor p-3 rounded-lg'
              onClick={handleClick}>
              {loading ? 'Loading...' : 'More Details'}
            </Link>
            <div className='flex gap-4'>
              <ShareButton url={`/${params?.lang}/properties/${slug}`} />
              {isHeartFilled ? (
                <IoIosHeart
                  className='text-red-500 text-2xl md:text-3xl cursor-pointer'
                  onClick={toggleHeart}
                  role='button'
                  tabIndex={0}
                  onKeyDown={toggleHeart}
                />
              ) : (
                <IoIosHeartEmpty
                  className='text-primary-secondaryTextColor text-2xl md:text-3xl cursor-pointer'
                  onClick={toggleHeart}
                  role='button'
                  tabIndex={0}
                  onKeyDown={toggleHeart}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoginPopupOpen && (
        <LoginForm
          onClose={closeLoginPopup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default HorizontalListCard;
