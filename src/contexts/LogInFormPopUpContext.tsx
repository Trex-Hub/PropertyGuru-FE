'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

const LogInFormPopUpContext = createContext<{
  popUpLogInForm: boolean;
  setPopUpLogInForm: Dispatch<SetStateAction<boolean>>;
  toggleLogInFormPopUp: () => void;
  resetPasswordPopUp: boolean;
  setResetPasswordPopUp: Dispatch<SetStateAction<boolean>>;
}>({
  popUpLogInForm: false,
  setPopUpLogInForm: () => {},
  toggleLogInFormPopUp: () => {},
  resetPasswordPopUp: false,
  setResetPasswordPopUp: () => {},
});

const LogInFormPopUpProvider = ({ children }: any) => {
  const [popUpLogInForm, setPopUpLogInForm] = useState(false);
  const [resetPasswordPopUp, setResetPasswordPopUp] = useState(false);
  const toggleLogInFormPopUp = useCallback(() => {
    setPopUpLogInForm(prevState => !prevState);
  }, [popUpLogInForm, setPopUpLogInForm]);

  return (
    <LogInFormPopUpContext.Provider
      value={{
        popUpLogInForm,
        setPopUpLogInForm,
        toggleLogInFormPopUp,
        resetPasswordPopUp,
        setResetPasswordPopUp,
      }}>
      {children}
    </LogInFormPopUpContext.Provider>
  );
};

const useLogInFormPopUp = () => useContext(LogInFormPopUpContext);

export { LogInFormPopUpProvider, useLogInFormPopUp };
