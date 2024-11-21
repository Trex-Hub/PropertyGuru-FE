'use client';
import { RxCross2 } from 'react-icons/rx';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useFormik } from 'formik';
import { forgotPasswordFormSchema } from '@/utils/validation-schemas';
import logger from '@/utils/logger';
import { FORGOT_PASSWORD_FORM } from '@/configs/endpoints';
import { useKeyDownHandler } from '@/utils/utilities';

type ForgetPasswordPopupProps = {
  handleModalToggle: () => void;
};
const ForgetPasswordPopup: React.FC<ForgetPasswordPopupProps> = ({
  handleModalToggle,
}) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordFormSchema,
    onSubmit: async values => {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      try {
        const response = await fetch(FORGOT_PASSWORD_FORM, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No account registered with this email');
          }
          throw new Error(data.error?.message || 'Something went wrong');
        }

        // Display success message if the email is sent successfully
        setSuccessMessage('Reset password email has been sent!');
        logger.log('Reset email sent:', data);
      } catch (error: any) {
        // Display error message if something goes wrong

        setErrorMessage(
          error.message || 'Failed to send reset password email.'
        );
        logger.error('Error in forgot password:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'>
      <div
        className='bg-white rounded-3xl p-8 shadow-xl relative w-80 md:w-96'
        onClick={e => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-base font-bold'>Forgot Password</p>
          <RxCross2
            onClick={handleModalToggle}
            role='button'
            tabIndex={0}
            className='text-xl cursor-pointer'
            onKeyDown={useKeyDownHandler(handleModalToggle)}
          />
        </div>

        {successMessage && (
          <p className='text-green-500 text-sm mb-4'>{successMessage}</p>
        )}
        {errorMessage && (
          <p className='text-red-500 text-sm mb-4'>{errorMessage}</p>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <Input
              className='rounded-[0.625rem]'
              type='email'
              placeholder='Enter your email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <Button
            type='submit'
            disabled={loading}
            className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
            {loading ? 'Sending...' : 'Send Reset Email'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPopup;
