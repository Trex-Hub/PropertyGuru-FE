'use client';
import { useState, useCallback } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { IoIosArrowDown, IoMdArrowForward } from 'react-icons/io';
import { IoCallOutline } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';
import { useToast } from '../ui/use-toast';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/utils/constants';
import { getWhatsAppLink } from '@/utils/utilities';
import EnquiryFormSuccess from '../EnquiryFormSuccess';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EnquiryData } from '@/models/enquiry';
import { createEnquiry } from '@/services/enquiry';
import { ResponseStatusEnum } from '@/models/common';
import { enquiryFormSchema } from '@/utils/validation-schemas';

export default function EnquiryForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik<EnquiryData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      canContact: false,
    },
    validationSchema: enquiryFormSchema,
    onSubmit: async (
      values: EnquiryData,
      { resetForm }: FormikHelpers<EnquiryData>
    ) => {
      const { status, data, error } = await createEnquiry(values);
      if (status === ResponseStatusEnum.SUCCESS) {
        resetForm();
        setIsSubmitted(true);
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
    },
  });

  const handleTermsCheck = useCallback(
    (checked: boolean) => formik.setFieldValue('canContact', checked),
    [formik]
  );

  const handleCallClick = useCallback(() => {
    window.location.href = `tel:+${PHONE_NUMBER}`;
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const message = 'Hello, I would like to enquire about your services.';
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank');
  }, [WHATSAPP_NUMBER, getWhatsAppLink]);

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
    return <EnquiryFormSuccess />;
  }

  return (
    <div className='border border-x-primary-enquiryFormBorderColor rounded-[0.625rem] shadow-md mt-5 bg-primary-backgroundColor'>
      <div className='flex flex-col px-4 py-5 gap-4 '>
        <p className='text-base font-bold font-secondary text-primary-contactUsTextColor'>
          Enquire Now
        </p>
        <form
          className='pr-2 lg:pr-5 font-primary'
          onSubmit={formik.handleSubmit}
          noValidate>
          <div className='mb-3'>
            <Input
              type='text'
              className='rounded-[0.625rem] focus-visible:ring-[0.5]'
              placeholder='Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-red-500 text-sm'>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className='mb-3'>
            <Input
              type='email'
              className='rounded-[0.625rem] focus-visible:ring-[0.5]'
              placeholder='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
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
                placeholder='Mobile Number'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className='text-red-500 text-sm'>{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className='flex items-center space-x-2 mb-4'>
            <Checkbox
              id='terms'
              className='text-primary-secondaryTextColor'
              onCheckedChange={handleTermsCheck}
              name='canContact'
              checked={formik.values.canContact}
            />
            <label
              htmlFor='terms'
              className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-primaryTextColor'>
              Yes, I&apos;d like to learn more, please contact me.
            </label>
          </div>
          {formik.touched.canContact && formik.errors.canContact ? (
            <div className='text-red-500 text-sm mb-3'>
              {formik.errors.canContact}
            </div>
          ) : null}
          <div className='flex lg:flex-row lg:justify-between flex-col gap-3 items-center flex-wrap xl:flex-nowrap'>
            <Button
              type='submit'
              className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor font-semibold py-2 rounded-md flex gap-2 hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border'
              disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Loading...' : 'Get In Touch'}
              <IoMdArrowForward />
            </Button>
            <div className='w-full flex gap-2'>
              <Button
                type='button'
                onClick={handleCallClick}
                className='w-full border border-primary-loginBorder bg-primary-backgroundColor text-sm text-primary-loginTextColor font-semibold py-2 rounded-md hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex gap-2'>
                <IoCallOutline />
                Call Us
              </Button>
              <Button
                type='button'
                onClick={handleWhatsAppClick}
                className='w-full border border-primary-loginBorder bg-primary-backgroundColor text-sm text-primary-loginTextColor font-semibold py-2 rounded-md hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex gap-2'>
                <FaWhatsapp />
                WhatsApp
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
