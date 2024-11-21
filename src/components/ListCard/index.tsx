'use client';
import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowDown, IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FloorPlan, Property } from '@/models/property';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  convertSquareFeetToSquareMeters,
  ellipsesText,
  formatPriceWithCommas,
  getBackgroundColorClass,
  isNumber,
} from '@/utils/utilities';
import ShareButton from '../ShareButton';
import { useCallback, useEffect, useState, useRef } from 'react';
import { AreaSystem, NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { getItem } from '@/utils/storageHelper';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import logger from '@/utils/logger';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '../ui/use-toast';
import { useWishListContext } from '@/contexts/WishlistContext';
import { useLogInFormPopUp } from '@/contexts/LogInFormPopUpContext';

interface ListCardProps {
  property: Property;
  params: {
    lang: string;
  };
}

const ListCard: React.FC<ListCardProps> = ({ property, params }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<FloorPlan | null>(
    property?.attributes?.floorPlan[0]
  );
  const [loading, setLoading] = useState(false);
  const [areaText, setAreaText] = useState('N/A');

  const { isLoggedIn } = useUser();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { wishListProperty, removeWishListProperty, wishListSlugObj } =
    useWishListContext();

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const {
    title,
    location,
    features,
    slug,
    floorPlan,
    image,
    possessionStatus,
    developer,
    handover,
  } = property.attributes;

  const handleClick = useCallback(() => {
    setLoading(true);
    const url = `/${params?.lang}/properties/${slug}`;
    router.push(url);
    window.scrollTo(0, 0);
  }, [router, slug]);

  const images = image?.data?.map(img => ({
    src: NEXT_PUBLIC_ASSETS_URL + img.attributes.url,
    alt: img.attributes.alternativeText,
    idx: img.id,
  })) || [{ src: '/property_2.svg', alt: 'property image', idx: 0 }];

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  }, [images.length]);
  const toggleHeart = useCallback(async () => {
    if (isLoggedIn) {
      try {
        if (!isHeartFilled) {
          await wishListProperty(property.attributes.slug);
        } else {
          await removeWishListProperty(property.attributes.slug);
        }
      } catch (error) {
        toast.toast({
          title: 'Error updating wishlist',
          variant: 'destructive',
        });
      }
    } else {
      toggleLogInFormPopUp();
    }
  }, [
    isLoggedIn,
    isHeartFilled,
    property.attributes.slug,
    wishListProperty,
    removeWishListProperty,
  ]);

  const { toggleLogInFormPopUp } = useLogInFormPopUp();

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prevState => !prevState);
  }, [setIsDropdownOpen]);
  const handleImageClick = useCallback(() => {
    setIsLightboxOpen(true);
  }, [setIsLightboxOpen]);
  const handleCloseRequest = useCallback(() => {
    setIsLightboxOpen(false);
  }, [setIsLightboxOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        setIsLightboxOpen(true);
      }
    },
    [setIsLightboxOpen]
  );

  const handleFloorPlanSelect = useCallback(
    (plan: FloorPlan) => () => {
      setSelectedFloorPlan(plan);
      setIsDropdownOpen(false);
    },
    [setSelectedFloorPlan, setIsDropdownOpen]
  );

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
  const price = selectedFloorPlan?.price;
  const priceDisplay = isNumber(Number(price))
    ? formatPriceWithCommas(Number(price))
    : price;
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
    if (wishListSlugObj && property?.attributes?.slug) {
      setIsHeartFilled(!!wishListSlugObj[property.attributes.slug]);
    } else {
      setIsHeartFilled(false);
    }
  }, [wishListSlugObj, property?.attributes?.slug]);

  useEffect(() => {
    setIsMounted(true);

    // Define an async function to handle image preloading
    const preloadImages = async () => {
      try {
        await Promise.all(
          images.map(
            img =>
              new Promise((resolve, reject) => {
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.onload = () => resolve(img.src);
                imgElement.onerror = () =>
                  reject(new Error(`Failed to load image: ${img.src}`));
              })
          )
        );
        setImagesLoaded(true);
      } catch (error) {
        logger.error('Error preloading images:', error);
      }
    };

    // Call the async function
    preloadImages();

    // Cleanup function to handle unmounting if necessary
    return () => {
      setIsMounted(false);
    };
  }, [images]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='flex gap-5 w-[20rem] md:w-[25rem] md:h-[31.25rem] transform transition-transform duration-300 hover:scale-[1.001]  hover:shadow-xl'>
        <div className='w-full  max-w-sm md:max-w-md lg:max-w-lg mx-auto group'>
          <div className='relative'>
            <div
              className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary-iconBackgroundColor bg-opacity-50 rounded-lg z-10 px-[0.5rem] py-[0.75rem]'
              onClick={handlePrev}
              onKeyDown={handlePrev}
              tabIndex={0}
              role='button'>
              <IoIosArrowBack className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
            </div>
            <div
              className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-iconBackgroundColor bg-opacity-50 rounded-lg z-10 px-[0.5rem] py-[0.75rem]'
              onClick={handleNext}
              onKeyDown={handleNext}
              tabIndex={0}
              role='button'>
              <IoIosArrowForward className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
            </div>
            <div
              className='w-[20rem] md:w-[25rem] h-[16.25rem] mx-auto overflow-hidden rounded-tl-[1.25rem] rounded-tr-[1.25rem]'
              onClick={handleImageClick}
              role='button'
              tabIndex={0}
              onKeyDown={handleKeyDown}>
              {images.map((img, index) => (
                <div
                  key={img.idx}
                  className={cn(
                    'w-full h-full',
                    index === currentIndex ? 'block' : 'hidden'
                  )}>
                  <Image
                    width={400}
                    height={260}
                    alt={img.alt ?? 'Property Images'}
                    src={img.src || ''}
                    className='w-full h-full object-cover transition-transform duration-1000 transform group-hover:scale-105'
                  />
                </div>
              ))}
            </div>
            {possessionStatus === 'Pre Launch' ? (
              <div className='absolute top-6 left-[-6px] md:left-[-8px] font-primary bg-primary-preLaunchFlagBackgroundColor text-xs font-semibold text-primary-whiteTextColor px-2 py-1 rounded-r-[20px] rounded-l-[4px] transform transition-transform duration-300 group-hover:-translate-y-1'>
                Pre Launch
              </div>
            ) : null}
            <div className='flex justify-between absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 text-center text-primary-backgroundColor pt-2 transition-all duration-300 group-hover:bg-opacity-50 group-hover:pt-0'>
              {isNumber(Number(selectedFloorPlan?.price)) ? (
                <>
                  <div className='flex mb-1 px-4 text-center items-baseline gap-1'>
                    <p className='text-xs md:text-sm'>From</p>
                    <p className='text-sm md:text-base font-semibold transition-colors duration-300 group-hover:text-primary-labelColor'>
                      AED
                    </p>
                    <p className='text-[1.5625rem] md:text-[1.875rem] font-semibold transition-colors duration-300 group-hover:text-primary-labelColor'>
                      {formatPriceWithCommas(selectedFloorPlan?.price)}
                    </p>
                  </div>
                  <Link
                    href={`/${params?.lang}/properties/${slug}`}
                    className='hidden absolute right-4 bottom-4 group-hover:block transition-opacity duration-300'>
                    <IoIosArrowForward className='text-primary-iconBackgroundColor text-sm md:text-lg cursor-pointer' />
                  </Link>
                </>
              ) : (
                <p className='flex mb-1 px-4 text-center items-baseline gap-1 text-[1.5625rem] md:text-[1.875rem] font-semibold transition-colors duration-300 group-hover:text-primary-labelColor'>
                  {priceDisplay}
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col p-4 bg-white shadow-md rounded-b-[12px] font-primary'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 mb-2'>
                <CiLocationOn className='text-primary-secondaryTextColor text-lg md:text-xl' />
                <p className='text-xs md:text-base text-primary-titleTextColor'>
                  {ellipsesText(location?.area, 20)},{' '}
                  {ellipsesText(location?.city, 12)}
                </p>
              </div>
              <div className='w-[5.375rem] h-[2.70rem] justify-end flex'>
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
              className='text-base md:text-xl font-bold text-primary-textColor mb-2 flex-wrap'>
              {ellipsesText(title, 30)}
            </Link>
            <div className='flex justify-between flex-col-reverse	 md:flex-row '>
              <div
                className={cn(
                  'rounded-3xl mb-1 sm:mb-3 inline-block max-w-max',
                  getBackgroundColorClass(possessionStatus)
                )}>
                <p className='text-sm font-primary px-3 py-1'>
                  {possessionStatus}
                </p>
              </div>
              <div className='md:text-center mb-1 sm:mb-3'>
                <p className='text-primary-iconColor text-sm py-1 px-2  sm:px-0'>
                  Delivery Date :{' '}
                  <span className='font-semibold text-primary-radioButtonTextColor md:text-primary-textColor '>
                    {ellipsesText(handover, 10) || 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            <div
              className='flex items-center gap-2 mb-3 relative'
              onClick={toggleDropdown}
              ref={dropdownRef}
              onKeyDown={toggleDropdown}
              tabIndex={0}
              role='button'>
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
                <div className='absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50  max-h-[6.1rem] overflow-y-auto'>
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

            <div className='flex mb-3 gap-1 md:gap-2 overflow-x-hidden md:overflow-x-auto max-w-full'>
              {features && features.length > 0 ? (
                features.slice(0, 3).map(feature => (
                  <div key={feature} className='flex gap-2 items-center'>
                    <Image
                      src='/feature_icon.jpeg'
                      alt='Feature Icon'
                      width={20}
                      height={20}
                    />
                    <p className='text-xs md:hidden md:text-sm text-primary-primaryTextColor'>
                      {ellipsesText(feature, 10)}
                    </p>
                    <p className='text-xs hidden md:block md:text-sm text-primary-primaryTextColor'>
                      {ellipsesText(feature, 12)}
                    </p>
                  </div>
                ))
              ) : (
                <p className='text-xs md:text-sm text-primary-primaryTextColor'>
                  No features available
                </p>
              )}
            </div>

            <div className='flex justify-between items-center '>
              <Link
                href={`/${params?.lang}/properties/${slug}`}
                onClick={handleClick}
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-primary-loginTextColor border border-primary-loginBorder bg-primary-backgroundColor hover:bg-primary-labelColor hover:text-primary-whiteTextColor'>
                {loading ? 'Loading...' : 'More Details'}
              </Link>
              <div className='flex gap-4'>
                <ShareButton url={`/${params?.lang}/properties/${slug}`} />
                {isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <IoIosHeartEmpty
                    className='text-primary-secondaryTextColor text-2xl md:text-3xl cursor-pointer'
                    role='button'
                    onClick={toggleLogInFormPopUp}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {isLightboxOpen && imagesLoaded && (
          <Lightbox
            mainSrc={images[currentIndex].src}
            nextSrc={
              images.length > 1
                ? images[(currentIndex + 1) % images.length].src
                : undefined
            }
            prevSrc={
              images.length > 1
                ? images[(currentIndex + images.length - 1) % images.length].src
                : undefined
            }
            onCloseRequest={handleCloseRequest}
            onMovePrevRequest={handlePrev}
            onMoveNextRequest={handleNext}
          />
        )}
      </div>
    </>
  );
};

export default ListCard;
