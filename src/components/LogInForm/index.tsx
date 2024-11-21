import { FACEBOOK_LOGIN, LOG_IN_FORM } from '@/configs/endpoints';
import { setItem } from '@/utils/storageHelper';
import { signInFormSchema } from '@/utils/validation-schemas';
import { useFormik } from 'formik';
import { useToast } from '../ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import logger from '@/utils/logger';
import { RxCross2 } from 'react-icons/rx';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useCallback, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useKeyDownHandler } from '@/utils/utilities';
import { GOOGLE_LOGIN } from '@/configs/endpoints';
import Image from 'next/image';

export default function LogInForm({
  setLoginPopupOpen,
  closePopupOnOutsideClick,
  handleKeyDown,
  toggleLoginPopup,
  toggleSignupPopup,
  toggleForgetPasswordPopup,
}: {
  setLoginPopupOpen: (open: boolean) => void;
  closePopupOnOutsideClick: (e: React.MouseEvent) => void;
  handleKeyDown: (e: any) => void;
  toggleLoginPopup: () => void;
  toggleSignupPopup: () => void;
  toggleForgetPasswordPopup: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isLoginPopUp = searchParams.get('isLoginPopUp') === 'true';
  const { setIsLoggedIn, setTriedToLogIn, fetchInterestForm, setToken } =
    useUser();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);
  const [failedAttempts, setFailedAttempts] = useState(0);

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
          const data = await response.json();
          const token = data.jwt;
          setItem('token', token);
          setToken(token);
          setLoginPopupOpen(false);
          setTriedToLogIn(true);
          setIsLoggedIn(true);
          router.push('/');
          toast({
            title: 'Logged in successfully',
            variant: 'success',
          });
          // Fetch interest form
          await fetchInterestForm();
        } else {
          if (response.status === 404) {
            toast({
              title: 'You are not registered with us. Please sign up first.',
              variant: 'destructive',
              className:
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
            });
          } else {
            setFailedAttempts(prev => prev + 1);
            if (failedAttempts + 1 > 5) {
              toast({
                title: 'Please consider resetting your password.',
                variant: 'destructive',
                className:
                  'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
              });
            } else {
              toast({
                title: 'Invalid email or password',
                variant: 'destructive',
                className:
                  'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
              });
            }
          }
        }
      } catch (error) {
        logger.error('An unexpected error occurred.', error);
        toast({
          title: 'Something went wrong!',
          variant: 'destructive',
        });
      }
    },
  });

  const handleGoogleLogin = () => {
    router.push(`${GOOGLE_LOGIN}`);
  };

  const handleFacebookLogin = () => {
    router.push(`${FACEBOOK_LOGIN}`);
  };

  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className='bg-white rounded-3xl p-8 shadow-xl relative w-80  md:w-96 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4 hover:cursor-default'>
          <p className='text-base font-bold'>Log In</p>
          <RxCross2
            onClick={toggleLoginPopup}
            role='button'
            tabIndex={0}
            onKeyDown={useKeyDownHandler(toggleLoginPopup)}
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-500 text-xs ml-2 my-2'>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div
            className={`relative ${formik.touched.password && formik.errors.password ? 'mb-0' : 'mb-4'}`}>
            <Input
              className='rounded-[0.625rem] pr-10'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {/* Moved the Error Message down. */}
            <div
              className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer'
              onClick={togglePasswordVisibility}
              role='button'
              tabIndex={0}
              onKeyDown={useKeyDownHandler(togglePasswordVisibility)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className='text-red-500 text-xs ml-2 my-2'>
              {formik.errors.password}
            </div>
          ) : null}
          <div className='flex justify-between mb-5'>
            <div className='flex items-center space-x-2'></div>
            <div
              className='text-xs text-primary-forgetPasswordTextColor cursor-pointer'
              onClick={toggleForgetPasswordPopup}
              role='button'
              tabIndex={0}
              onKeyDown={useKeyDownHandler(toggleForgetPasswordPopup)}>
              Forgot Password?
            </div>
          </div>
          <Button
            type='submit'
            className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
            Log In
          </Button>
          <div className='space-y-2 my-5'>
            <div className='relative flex justify-center text-xs'>
              <span className='bg-background px-2 text-muted-foreground hover:cursor-default'>
                Or Continue With
              </span>
            </div>
            <Button
              type='button'
              variant='outline'
              className='w-full flex items-center justify-center space-x-2'
              onClick={handleGoogleLogin}>
              <Image
                src='/googlelogo.svg'
                alt='Google Icon'
                width={20}
                height={20}
              />
              <span>Continue with Google</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full flex items-center justify-center space-x-2'
              onClick={handleFacebookLogin}>
              <Image
                src='/facebooklogo.svg'
                alt='Google Icon'
                width={20}
                height={20}
              />
              <span>Continue with Facebook</span>
            </Button>
          </div>
          <div
            className={`${
              isLoginPopUp && 'hidden'
            } text-primary-forgetPasswordTextColor font-primary text-sm justify-center flex items-center mt-4 underline cursor-pointer`}
            onClick={toggleSignupPopup}
            role='button'
            tabIndex={0}
            onKeyDown={useKeyDownHandler(toggleSignupPopup)}>
            Create an Account
          </div>
        </form>
      </div>
    </div>
  );
}
