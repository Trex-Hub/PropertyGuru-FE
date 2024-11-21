'use client';

import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useCallback, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { createEnquiry } from '@/services/enquiry';
import { useFormik, FormikHelpers } from 'formik';
import { EnquiryData } from '@/models/enquiry';
import { ResponseStatusEnum } from '@/models/common';
import { useToast } from '../ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import { contactUsPopupSchema } from '@/utils/validation-schemas';

type ContactUsPopupProps = {
  handleModalToggle: () => void;
};

const ContactUsPopup: React.FC<ContactUsPopupProps> = ({
  handleModalToggle,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: contactUsPopupSchema,
    onSubmit: async (
      values: EnquiryData,
      { resetForm }: FormikHelpers<EnquiryData>
    ) => {
      const { status, data, error } = await createEnquiry(values);
      if (status === ResponseStatusEnum.SUCCESS) {
        resetForm();
        toast({
          title: data,
          variant: 'default',
        });
        handleModalToggle();
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
  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
  }, []);

  const handleTriggerClick = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);
  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary p-4'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className='absolute bottom-8 right-4 z-50 flex flex-col transition-transform transform bg-white border border-gray-200 rounded-lg p-4'>
        <RxCross2
          className='self-end mb-2 cursor-pointer'
          onClick={handleModalToggle}
        />
        <div className='flex justify-between items-center mb-4'>
          <p className='text-base font-primary font-bold text-primary-contactUsTextColor'>
            Contact Us
          </p>
        </div>
        <form
          className='pr-5 lg:pr-5 font-primary'
          onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <Input
              type='text'
              className='rounded-[0.625rem] w-64 lg:w-80 lg:h-11'
              placeholder='Name'
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
              placeholder='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-500 text-sm'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='mb-4'>
            <div className='flex items-center  w-full rounded-[0.625rem] border border-primary-dropdownInputBorderColor bg-background px-0 py-0 pr-0 text-sm h-[2.75rem]'>
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
                  <DropdownMenuContent className='w-full lg:w-[3rem] mt-2 bg-white border border-primary-dropdownInputBorderColor rounded-lg shadow-lg'>
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
                placeholder='Contact number'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className='text-red-500 text-sm'>{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className='mb-4'>
            <Textarea
              className='rounded-[0.625rem]'
              placeholder='Type your message....'
              name='message'
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className='text-red-500 text-sm'>
                {formik.errors.message}
              </div>
            ) : null}
          </div>
          <Button
            type='submit'
            className='bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md w-32 h-9 hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border'
            disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ContactUsPopup;
