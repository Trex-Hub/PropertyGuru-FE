// MissingDetailsPopupContext.tsx
'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface MissingDetailsPopupContextProps {
  isMissingDetailsPopupOpen: boolean;
  setMissingDetailsPopupOpen: Dispatch<SetStateAction<boolean>>;
}

const MissingDetailsPopupContext =
  createContext<MissingDetailsPopupContextProps>({
    isMissingDetailsPopupOpen: false,
    setMissingDetailsPopupOpen: () => {},
  });

const MissingDetailsPopupProvider = ({ children }: { children: ReactNode }) => {
  const [isMissingDetailsPopupOpen, setMissingDetailsPopupOpen] =
    useState(false);

  return (
    <MissingDetailsPopupContext.Provider
      value={{ isMissingDetailsPopupOpen, setMissingDetailsPopupOpen }}>
      {children}
    </MissingDetailsPopupContext.Provider>
  );
};

const useMissingDetailsPopup = () => useContext(MissingDetailsPopupContext);

export { MissingDetailsPopupProvider, useMissingDetailsPopup };
