'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdOutlineCameraAlt } from 'react-icons/md';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

type Image = {
  src: string;
  alt: string;
  idx: number;
};

type Images = {
  images: Array<Image>;
};

const Carousel = ({ images }: Images) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageClick = useCallback(() => {
    setIsLightboxOpen(true);
  }, [setIsLightboxOpen]);
  const handleCloseRequest = useCallback(() => {
    setIsLightboxOpen(false);
  }, [setIsLightboxOpen]);
  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  }, [images]);
  const handlePrev = useCallback(() => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  }, [images]);

  return (
    <div className='flex w-[100%] aspect-video relative items-center'>
      <div className='left-2 absolute'>
        <div
          className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary-iconBackgroundColor bg-opacity-50 rounded-lg z-10 px-[0.5rem] py-[0.75rem]'
          onClick={handlePrev}
          onKeyDown={handlePrev}
          tabIndex={0}
          role='button'>
          <IoIosArrowBack className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
        </div>
      </div>
      <div className='w-full h-full' onClick={handleImageClick}>
        {images?.map((img, index) => (
          <div
            key={img.idx}
            className={cn(
              'w-[100%] h-[100%] ',
              index === currentIndex ? 'block' : 'hidden'
            )}>
            {img.src && (
              <Image
                className='w-[100%] h-[100%] object-cover'
                src={img.src}
                alt={img.alt ?? 'Property Images'}
                width={227}
                height={404}
                quality={100}
              />
            )}
            <div className='absolute w-full bottom-0 h-5 md:h-auto  bg-black bg-opacity-50 text-white text-center flex justify-between items-center py-4 px-5'>
              <div className='flex gap-2 items-center'>
                <MdOutlineCameraAlt className='text-primary-whiteTextColor text-2xl' />
                <p className='text-base text-primary-whiteTextColor'>
                  {`${currentIndex + 1}/${images.length}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute right-2'>
        <div
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-iconBackgroundColor bg-opacity-50 rounded-lg z-10 px-[0.5rem] py-[0.75rem]'
          onClick={handleNext}
          onKeyDown={handleNext}
          tabIndex={0}
          role='button'>
          <IoIosArrowForward className='text-primary-titleTextColor text-sm md:text-sm cursor-pointer' />
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={images[currentIndex].src}
          enableZoom
          imageTitle
          clickOutsideToClose
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
  );
};

export default Carousel;
