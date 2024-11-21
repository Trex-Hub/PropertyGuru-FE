'use client';

import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import React, { useCallback, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { downloadBrochure } from '@/services/enquiry';
import { useFormik, FormikHelpers } from 'formik';
import { EnquiryData } from '@/models/enquiry';
import { ResponseStatusEnum } from '@/models/common';
import { useToast } from '../ui/use-toast';
import DownloadBrochureSuccessPopup from '../DownloadBrochureSuccessPopup';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import { brochureFormSchema } from '@/utils/validation-schemas';

type DownloadBrochureProps = {
  handleDownloadBrochurePopupToggle: () => void;
  propertyId: number | undefined;
};

const DownloadBrochure: React.FC<DownloadBrochureProps> = ({
  handleDownloadBrochurePopupToggle,
  propertyId,
}) => {
  const [
    isDownloadBrochureSuccessPopupOpen,
    setIsDownloadBrochureSuccessPopupOpen,
  ] = useState(false);

  const handleDownloadBrochureSuccessPopupToggle = useCallback(() => {
    setIsDownloadBrochureSuccessPopupOpen(prevState => !prevState);
  }, []);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      propertyId,
      name: '',
      email: '',
      phone: '',
    },
    validationSchema: brochureFormSchema,
    onSubmit: async (
      values: EnquiryData,
      { resetForm }: FormikHelpers<EnquiryData>
    ) => {
      const { status, data, error } = await downloadBrochure(values);
      if (status === ResponseStatusEnum.SUCCESS) {
        resetForm();
        setIsSubmitted(true);
        setEmail(values.email);
        toast({
          title: data,
          variant: 'default',
        });
        handleDownloadBrochureSuccessPopupToggle();
        return;
      }
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const closePopupOnOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === 'popup-overlay') {
        handleDownloadBrochurePopupToggle();
        handleDownloadBrochureSuccessPopupToggle();
      }
    },
    [
      handleDownloadBrochurePopupToggle,
      handleDownloadBrochureSuccessPopupToggle,
    ]
  );

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closePopupOnOutsideClick(e);
      }
    },
    [closePopupOnOutsideClick]
  );
  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
  }, []);

  const handleTriggerClick = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  if (isSubmitted) {
    return isDownloadBrochureSuccessPopupOpen ? (
      <DownloadBrochureSuccessPopup
        handleDownloadBrochureSuccessPopupToggle={
          handleDownloadBrochureSuccessPopupToggle
        }
        userEmail={email}
      />
    ) : null;
  }

  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary p-6'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className='absolute z-50 flex flex-col transition-transform transform bg-white border border-gray-200 rounded-lg p-4 md:w-[25rem]'>
        <RxCross2
          className='self-end my-2 cursor-pointer'
          onClick={handleDownloadBrochurePopupToggle}
        />
        <div className='flex flex-col items-start my-4 px-2'>
          <p className='text-sm font-primary font-semibold text-primary-primaryTextColor'>
            Damac Canal Crow
          </p>
          <p className='text-2xl font-primary font-bold text-primary-primaryTextColor'>
            Get the Brochure on Email
          </p>
        </div>
        <form className='font-primary px-2' onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <Input
              type='text'
              className='rounded-[0.625rem]'
              placeholder='Your Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-red-500 text-sm'>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className='mb-4'>
            <Input
              type='email'
              className='rounded-[0.625rem]'
              placeholder='Your Email Id'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-500 text-sm'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='mb-3'>
            <div className='flex items-center h-10 w-full rounded-[0.625rem] border border-input bg-background px-0 py-0 pr-0 text-sm'>
              <DropdownMenu open={open} onOpenChange={handleOpenChange}>
                <div className='relative  w-[3.5rem]'>
                  <DropdownMenuTrigger
                    asChild
                    onPointerDown={handlePointerDown}
                    onClick={handleTriggerClick}>
                    <button className='appearance-none flex items-center px-2 gap-1'>
                      +971
                      <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-full lg:w-[2rem] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg'>
                    <DropdownMenuItem className='px-4 py-2 text-primary-secondaryTextColor hover:bg-primary-dropdownHoverColor cursor-pointer'>
                      +971
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
              <Input
                name='phone'
                type='tel'
                className='shadow-none border-0 m-0 h-9 rounded-l-none rounded-r-md focus-visible:ring-[0.5]'
                placeholder='Your Mobile Number'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className='text-red-500 text-sm'>{formik.errors.phone}</div>
            ) : null}
          </div>
          <Button
            type='submit'
            className='font-primary h-[2.875rem] bg-primary-labelColor text-base font-bold text-primary-whiteTextColor py-4 mb-4 rounded-md w-full hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border'
            disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Sending...' : 'Send Brochure'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DownloadBrochure;
