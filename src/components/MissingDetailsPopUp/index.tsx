import { RxCross2 } from 'react-icons/rx';
import { Button } from '../ui/button';
import { useKeyDownHandler } from '@/utils/utilities';
import { useFormik } from 'formik';
import { missingDetailsValidationSchema } from '@/utils/validation-schemas';
import { UPDATE_USER_DETAILS } from '@/configs/endpoints';
import { useUser } from '@/contexts/UserContext';
import { setItem } from '@/utils/storageHelper';

interface MissingDetailsPopUpProps {
  setMissingDetailsPopupOpen: (open: boolean) => void;
  closePopupOnOutsideClick?: (e: React.MouseEvent) => void;
  handleKeyDown?: (e: any) => void;
}

export default function MissingDetailsPopUp({
  setMissingDetailsPopupOpen,
  closePopupOnOutsideClick,
  handleKeyDown,
}: MissingDetailsPopUpProps) {
  const { userDetails, token } = useUser();
  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
    },
    validationSchema: missingDetailsValidationSchema,
    onSubmit: async values => {
      const response = await fetch(
        `${UPDATE_USER_DETAILS}/${userDetails?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mobile: values.mobileNumber,
          }),
        }
      );

      if (response.ok) {
        setMissingDetailsPopupOpen(false);
        setItem('skipMissingDetailsForm', true);
      } else {
        return null;
      }
    },
  });

  const togglePopup = () => {
    setMissingDetailsPopupOpen(false);
    setItem('skipMissingDetailsForm', true);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-primary'
      onClick={closePopupOnOutsideClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className='bg-white rounded-3xl p-8 shadow-xl relative w-80 md:w-96 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-base font-bold'>Missing Details</p>
          <RxCross2
            onClick={togglePopup}
            role='button'
            tabIndex={0}
            onKeyDown={useKeyDownHandler(togglePopup)}
            className='text-xl cursor-pointer'
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <input
              type='text'
              name='mobileNumber'
              placeholder='Mobile Number'
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='rounded-[0.625rem] w-full px-3 py-2 border'
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className='text-red-500 text-xs'>
                {formik.errors.mobileNumber}
              </div>
            ) : null}
          </div>
          <Button
            type='submit'
            className='w-full bg-primary-labelColor text-sm text-primary-whiteTextColor py-2 rounded-md hover:bg-primary-labelColor'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
