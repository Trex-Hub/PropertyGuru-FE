'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  return { isLoading, setIsLoading };
};

export { LoadingProvider, useLoading };
