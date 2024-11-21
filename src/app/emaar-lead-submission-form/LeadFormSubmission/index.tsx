'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ResponseStatusEnum } from '@/models/common';
import { EmaarLeadFormData } from '@/models/enquiry';
import { createEmaarLeadForm } from '@/services/enquiry';
import { emmarLeadFormSchema } from '@/utils/validation-schemas';
import { FormikHelpers, useFormik } from 'formik';
import { useState } from 'react';

export default function LeadFormSubmission() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik<EmaarLeadFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      countryCode: '',
      numberOfBedrooms: '',
      country: '',
      callRecordingUrl: '',
      language: '',
      comment: '',
    },
    validationSchema: emmarLeadFormSchema,
    onSubmit: async (
      values: EmaarLeadFormData,
      { resetForm }: FormikHelpers<EmaarLeadFormData>
    ) => {
      const { status, data, error } = await createEmaarLeadForm(values);
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

  return (
    <div className='bg-primary-bannerBackgroundColor'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-primary-emaarTitle text-center text-2xl font-bold mt-32 font-teriary px-5'>
          EMAAR LEAD SUBMISSION FORM
        </h1>
        <div className='px-10 md:px-0  md:w-[35%] w-full'>
          <div className='bg-primary-backgroundColor rounded-lg my-7 shadow-lg'>
            <div className='flex px-5 py-10'>
              <form
                className='flex flex-col w-full'
                onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-4 text-sm'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Full Name
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='name'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      required
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Your Email
                    </label>
                    <Input
                      type='email'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      required
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Phone Number
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='phone'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      required
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Country Code
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='countryCode'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.countryCode}
                      required
                    />
                    {formik.errors.countryCode &&
                      formik.touched.countryCode && (
                        <div className='text-red-500 text-sm'>
                          {formik.errors.countryCode}
                        </div>
                      )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Number of Bedrooms
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='numberOfBedrooms'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.numberOfBedrooms}
                      required
                    />
                    {formik.errors.numberOfBedrooms &&
                      formik.touched.numberOfBedrooms && (
                        <div className='text-red-500 text-sm'>
                          {formik.errors.numberOfBedrooms}
                        </div>
                      )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Country
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='country'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      required
                    />
                    {formik.errors.country && formik.touched.country && (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.country}
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Call Recording URL
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='callRecordingUrl'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.callRecordingUrl}
                      required
                    />
                    {formik.errors.callRecordingUrl &&
                      formik.touched.callRecordingUrl && (
                        <div className='text-red-500 text-sm'>
                          {formik.errors.callRecordingUrl}
                        </div>
                      )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Leads Preferred Language
                    </label>
                    <Input
                      type='text'
                      className='rounded-[0.625rem] focus-visible:ring-[0.5]'
                      name='language'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.language}
                      required
                    />
                    {formik.errors.language && formik.touched.language && (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.language}
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-primary-textColor font-semibold '>
                      Customer Comments
                    </label>
                    <Textarea
                      className='rounded-[0.625rem]'
                      name='comment'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    />
                    {formik.errors.comment && formik.touched.comment && (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.comment}
                      </div>
                    )}
                  </div>
                  <Button
                    type='submit'
                    className='bg-[#007bff] text-white text-base font-primary mt-4'
                    disabled={formik.isSubmitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isSubmitted && (
          <div className='text-green-800 font-bold mb-10'>
            Form submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
}
