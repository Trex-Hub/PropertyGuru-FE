// This is deprecated component. It is not used in the project. It is kept for future reference.
import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { signInFormSchema } from '@/utils/validation-schemas';
import { LOG_IN_FORM } from '@/configs/endpoints';
import { setItem } from '@/utils/storageHelper';
import logger from '@/utils/logger';

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInFormSchema,
    onSubmit: async values => {
      try {
        const response = await fetch(LOG_IN_FORM, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          logger.log('Login successful');
          const data = await response.json();
          const token = data.jwt;
          setItem('token', token);
          onLoginSuccess();
          onClose();
        }
      } catch (error) {
        logger.error('An unexpected error occurred.', error);
      }
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'>
      <div
        className='bg-white rounded-3xl p-8 shadow-xl relative w-80 md:w-96 h-[340px]'
        onClick={e => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-base font-bold'>Log In</p>
          <RxCross2
            onClick={onClose}
            role='button'
            tabIndex={0}
            onKeyDown={onClose}
            className='text-xl cursor-pointer'
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <Input
              className='rounded-[0.625rem]'
              name='email'
              type='email'
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className='relative mb-4'>
            <Input
              className='rounded-[0.625rem] pr-10'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div
              className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer'
              onClick={togglePasswordVisibility}
              role='button'
              tabIndex={0}
              onKeyDown={togglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <div className='flex justify-between mb-5'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='terms'
                className='text-primary-secondaryTextColor'
              />
              <label
                htmlFor='terms'
                className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-primaryTextColor'>
                Remember my email
              </label>
            </div>
            <div className='text-xs text-primary-forgetPasswordTextColor cursor-pointer'>
              Forgot Password?
            </div>
          </div>
          <Button
            type='submit'
            className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
            Log In
          </Button>
          <div className='text-primary-forgetPasswordTextColor font-primary text-sm justify-center flex items-center mt-4 underline cursor-pointer'>
            Create an Account
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
