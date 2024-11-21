'use client';
import { FC, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/services/users';
import { getItem, removeItem, setItem } from '@/utils/storageHelper';
import { ResponseStatusEnum } from '@/models/common';
import { useToast } from '@/components/ui/use-toast';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/constants';
import axios from 'axios';
import { useMissingDetailsPopup } from './MissingDetailsPopupContext';
import logger from '@/utils/logger';
interface UserDetails {
  id: number;
  username: string;
  email: string;
  mobile: string;
  blocked: boolean;
  provider: string;
  confirmed: boolean;
  updated_at: string;
  created_at: string;
  developer_subscriptions: number | null;
}
interface PropTypes {
  children: React.ReactNode;
}
const Context = createContext<any | null>(null);
const UserProvider: FC<PropTypes> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    () => getItem('token') as string
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token ? true : false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [triedToLogIn, setTriedToLogIn] = useState(false);
  const { toast } = useToast();
  const [isMobileMissing, setIsMobileMissing] = useState<boolean>(false);
  const { setMissingDetailsPopupOpen } = useMissingDetailsPopup();
  const fetchInterestForm = async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_BASE_API_URL}/api/interest-form?username=${userDetails?.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem('skipInterestForm', 'true');
      } else {
        localStorage.setItem('skipInterestForm', 'false');
      }
    } catch (error) {
      return null;
    }
  };

  const checkMobile = () => {
    const hasSkipped = getItem('skipMissingDetailsForm') === 'true';
    if (!userDetails?.mobile && !hasSkipped) {
      setIsMobileMissing(true);
      setMissingDetailsPopupOpen(true);
    }
  };

  const reset = async () => {
    router.push('/');
    setUserDetails(null);
    removeItem('token');
    removeItem('skipMissingDetailsForm');
    router.refresh();
  };
  const onLogout = async () => {
    setIsLoggedIn(false);
    localStorage.removeItem('skipInterestForm');
    removeItem('skipMissingDetailsForm');
    reset();
    try {
      await axios.get('https://accounts.google.com/Logout');
    } catch (error) {
      logger.error(error);
    }
    toast({
      title: 'Logged out successfully',
      variant: 'default',
    });
  };
  const verifyToken = async (token?: string) => {
    setLoading(true);
    try {
      const { status, data } = await getLoggedInUser(token);
      if (status === ResponseStatusEnum.SUCCESS) {
        setUserDetails({
          id: data?.id,
          username: data?.username,
          email: data?.email,
          mobile: data?.mobile,
          blocked: data?.blocked,
          provider: data?.provider,
          confirmed: data?.confirmed,
          updated_at: data?.updated_at,
          created_at: data?.created_at,
          developer_subscriptions: data?.developer_subscriptions?.id,
        });
        setTriedToLogIn(false);
        checkMobile();
      } else throw new Error();
    } catch {
      reset();
    }
    setLoading(false);
  };
  useEffect(() => {
    if (token) {
      verifyToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [triedToLogIn, token]);

  const value: any = {
    userDetails,
    id: userDetails?.id,
    loading,
    onLogout,
    setUserDetails,
    isLoggedIn,
    triedToLogIn,
    setTriedToLogIn,
    setIsLoggedIn,
    token,
    fetchInterestForm,
    setToken,
    isMobileMissing,
    skipMissingDetails: () => setItem('skipMissingDetailsForm', 'true'),
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
export const useUser = () => useContext(Context);
export default UserProvider;
