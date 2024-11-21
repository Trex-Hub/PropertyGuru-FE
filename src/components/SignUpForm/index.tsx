import { RxCross2 } from 'react-icons/rx';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { signUpFormSchema } from '@/utils/validation-schemas';
import { useFormik } from 'formik';
import { SIGN_UP_FORM } from '@/configs/endpoints';
import logger from '@/utils/logger';
import { useToast } from '../ui/use-toast';

type SignUpPopupProps = {
  handleModalToggle: () => void;
};

const SignUpForm: React.FC<SignUpPopupProps> = ({ handleModalToggle }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [signUpMssg, setSignUpMssg] = useState('Sign Up');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpFormSchema,
    onSubmit: async values => {
      setIsLoading(true);
      try {
        const response = await fetch(SIGN_UP_FORM, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            mobile: values.mobile,
            username: values.username,
            password: values.password,
          }),
        });

        if (response.ok) {
          setSuccessMessage(
            'Please check your inbox and confirm your email to log in.'
          );
          setSignUpMssg('Thank you for signing up');
        } else {
          const err = await response.json();
          toast({
            title: err.error.message,
            variant: 'destructive',
          });
          logger.error('Failed to sign up');
        }
      } catch (error) {
        logger.error('An error occurred:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      id='popup-overlay'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'>
      <div className='bg-white rounded-3xl p-8 shadow-xl relative w-80 md:w-96'>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-base font-bold'>{signUpMssg}</p>
          <RxCross2
            onClick={handleModalToggle}
            className='text-xl cursor-pointer'
            role='button'
            tabIndex={0}
            onKeyDown={handleModalToggle}
          />
        </div>
        {successMessage ? (
          <p className='text-green-500 text-xs'>{successMessage}</p>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <Input
                className='rounded-[0.625rem]'
                placeholder='Username'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='text-red-500 text-xs ml-2 my-2'>
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className='mb-4'>
              <Input
                className='rounded-[0.625rem]'
                placeholder='Mobile'
                name='mobile'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className='text-red-500 text-xs ml-2 my-2'>
                  {formik.errors.mobile}
                </div>
              ) : null}
            </div>
            <div className='mb-4'>
              <Input
                className='rounded-[0.625rem]'
                placeholder='Email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-500 text-xs ml-2 my-2'>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div
              className={`relative ${formik.touched.password && formik.errors.password ? 'mb-0' : 'mb-4'}`}>
              <PasswordInput
                placeholder='Password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* Password Input and Formik Error can't be in a single div because it causing issue with eye icon placement */}
            {formik.touched.password && formik.errors.password ? (
              <div className='text-red-500 text-xs ml-2 my-2'>
                {formik.errors.password}
              </div>
            ) : null}
            <div
              className={`relative ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'mb-0'
                  : 'mb-4'
              }`}>
              <PasswordInput
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className='text-red-500 text-xs ml-2 my-2 mb-2'>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export function PasswordInput({
  value,
  onChange,
  onBlur,
  placeholder,
  name,
}: {
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <>
      <Input
        className='rounded-[0.625rem] pr-10'
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div
        className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer'
        onClick={togglePasswordVisibility}>
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </div>
    </>
  );
}

export default SignUpForm;
