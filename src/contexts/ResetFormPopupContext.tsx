'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';

const ResetFormPopupContext = createContext<{
  resetPasswordPopUp: boolean;
  setResetPasswordPopUp: Dispatch<SetStateAction<boolean>>;
}>({
  resetPasswordPopUp: false,
  setResetPasswordPopUp: () => {},
});

const ResetFormPopupProviderContext = ({ children }: any) => {
  const [resetPasswordPopUp, setResetPasswordPopUp] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('code');
    const resetpassword = params.get('resetpassword');
    if (resetpassword && token) {
      setResetPasswordPopUp(true);
    }
  }, []);
  return (
    <ResetFormPopupContext.Provider
      value={{
        resetPasswordPopUp,
        setResetPasswordPopUp,
      }}>
      {children}
    </ResetFormPopupContext.Provider>
  );
};

const ResetFormPopupProvider = ({ children }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <ResetFormPopupProviderContext>{children}</ResetFormPopupProviderContext>
    </Suspense>
  );
};

const useResetFormPopupPopUp = () => useContext(ResetFormPopupContext);

export { ResetFormPopupProvider, useResetFormPopupPopUp };
