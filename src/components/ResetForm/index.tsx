'use client';
import { useReducer, useEffect, useCallback } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { RESET_PASSWORD_FORM } from '@/configs/endpoints';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useResetFormPopupPopUp } from '@/contexts/ResetFormPopupContext';
import { useToast } from '../ui/use-toast';
import { ResetFormSchema } from '@/utils/validation-schemas';

// Define action types for the reducer
const TOGGLE_NEW_PASSWORD = 'TOGGLE_NEW_PASSWORD';
const TOGGLE_CONFIRM_PASSWORD = 'TOGGLE_CONFIRM_PASSWORD';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
const SET_CODE = 'SET_CODE';

// Initial state for the reducer
const initialState = {
  showNewPassword: false,
  showConfirmPassword: false,
  loading: false,
  error: '',
  successMessage: '',
  code: '',
};

// Reducer function to handle the state updates
type State = {
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  loading: boolean;
  error: string;
  successMessage: string;
  code: string;
};

type Action =
  | { type: 'TOGGLE_NEW_PASSWORD' }
  | { type: 'TOGGLE_CONFIRM_PASSWORD' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SUCCESS_MESSAGE'; payload: string }
  | { type: 'SET_CODE'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case TOGGLE_NEW_PASSWORD:
      return { ...state, showNewPassword: !state.showNewPassword };
    case TOGGLE_CONFIRM_PASSWORD:
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload };
    case SET_CODE:
      return { ...state, code: action.payload };
    default:
      return state;
  }
}

const ResetPasswordForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { toast } = useToast();

  const { resetPasswordPopUp, setResetPasswordPopUp } =
    useResetFormPopupPopUp();

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
      code: state.code,
    },
    validationSchema: ResetFormSchema,
    onSubmit: async values => {
      dispatch({ type: SET_ERROR, payload: '' });
      dispatch({ type: SET_SUCCESS_MESSAGE, payload: '' });
      dispatch({ type: SET_LOADING, payload: true });

      try {
        const response = await fetch(RESET_PASSWORD_FORM, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: values.newPassword,
            passwordConfirmation: values.confirmPassword,
            code: values.code,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Something went wrong');
        }

        dispatch({
          type: SET_SUCCESS_MESSAGE,
          payload: 'Password has been successfully reset!',
        });
        setResetPasswordPopUp(false);
        toast({
          title: 'Password has been successfully reset!',
          variant: 'success',
        });
        router.push('/');
      } catch (err: any) {
        toast({
          title: 'Failed to reset password',
          variant: 'destructive',
        });
        dispatch({
          type: SET_ERROR,
          payload: err.message || 'Failed to reset password',
        });
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('code');

    if (tokenFromUrl) {
      dispatch({ type: SET_CODE, payload: tokenFromUrl });
      formik.setFieldValue('code', tokenFromUrl);
    }
  }, []);

  const onShowPasswordToggle = useCallback(
    (type: typeof TOGGLE_NEW_PASSWORD | typeof TOGGLE_CONFIRM_PASSWORD) =>
      () => {
        dispatch({ type: type });
      },
    []
  );
  const handlepopup = useCallback(
    (open: boolean) => {
      setResetPasswordPopUp(open);
    },
    [setResetPasswordPopUp]
  );
  return (
    <>
      <Dialog open={resetPasswordPopUp} onOpenChange={handlepopup}>
        <DialogContent className='sm:max-w-md bg-transparent border-none'>
          <div className='bg-white rounded-3xl p-8 shadow-xl w-80 md:w-96'>
            <h1 className='text-2xl font-bold mb-4 text-center'>
              Reset Password
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`relative ${formik.touched.newPassword && formik.errors.newPassword ? 'mb-0' : 'mb-4'}`}>
                <Input
                  type={state.showNewPassword ? 'text' : 'password'}
                  className={`rounded-[0.625rem] pr-10 ${
                    formik.errors.newPassword && formik.touched.newPassword
                      ? 'border-red-500'
                      : ''
                  }`}
                  placeholder='New Password'
                  name='newPassword'
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer'
                  onClick={onShowPasswordToggle(TOGGLE_NEW_PASSWORD)}>
                  {state.showNewPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className='text-red-500 text-xs ml-2 my-2'>
                  {formik.errors.newPassword}
                </p>
              )}
              <div
                className={`relative ${formik.touched.newPassword && formik.errors.newPassword ? 'mb-0' : 'mb-4'}`}>
                <Input
                  type={state.showConfirmPassword ? 'text' : 'password'}
                  className={`rounded-[0.625rem] pr-10 ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? 'border-red-500'
                      : ''
                  }`}
                  placeholder='Confirm New Password'
                  name='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer'
                  onClick={onShowPasswordToggle(TOGGLE_CONFIRM_PASSWORD)}>
                  {state.showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className='text-red-500 text-xs ml-2 my-2'>
                    {formik.errors.confirmPassword}
                  </p>
                )}

              {/* Display validation errors */}

              {/* Display API errors */}
              {state.error && (
                <p className='text-red-500 text-sm mb-4'>{state.error}</p>
              )}
              {state.successMessage && (
                <p className='text-green-500 text-sm mb-4'>
                  {state.successMessage}
                </p>
              )}

              <Button
                type='submit'
                disabled={state.loading || !formik.isValid}
                className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
                {state.loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPasswordForm;
