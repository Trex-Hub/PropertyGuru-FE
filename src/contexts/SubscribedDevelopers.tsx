'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useUser } from './UserContext';
import axios from 'axios';
import { isProduction, NEXT_PUBLIC_BASE_API_URL } from '@/utils/constants';
import { useToast } from '@/components/ui/use-toast';

const subscribedDevelopersContext = createContext<{
  fetchSubscribedDevelopersIds: () => void;
  isDeveloperSubscribed: (a: number) => boolean;
  subscribeDeveloper: (developerId: number) => void;
  unsubscribeDeveloper: (developerId: number) => void;
  subscribedDevelopersIds: number[];
  subscribedDevelopersObj: { [keys: number]: boolean };
}>({
  fetchSubscribedDevelopersIds: () => {},
  subscribedDevelopersObj: {},
  subscribedDevelopersIds: [],
  isDeveloperSubscribed: () => false,
  subscribeDeveloper: () => null,
  unsubscribeDeveloper: () => null,
});

const SubscribedDeveloperProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn, userDetails, token } = useUser();

  const { toast } = useToast();

  const subscriptionId = useMemo(() => {
    return userDetails?.developer_subscriptions;
  }, [userDetails]);

  const [subscribedDevelopersIds, setSubscribedDevelopersIds] = useState<
    number[]
  >([]);

  const [subscribedDevelopersObj, setSubscribedDevelopersObj] = useState<{
    [keys: number]: boolean;
  }>({});

  const subscribeDeveloper = useCallback(
    async (developerId: number) => {
      const APIURL = NEXT_PUBLIC_BASE_API_URL;
      const url = `${APIURL}/api/developer-subscriptions/${subscriptionId}/subscribe`;
      try {
        // const response = await axios.
        const { id, update } = toast({
          title: 'Subscribing...',
          variant: 'default',
          stackable: false,
        });
        await axios.patch(
          url,
          {
            developerId: developerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              ...(!isProduction && { 'ngrok-skip-browser-warning': 'true' }),
            },
          }
        );
        // Add a 1-second timeout before updating the toast
        setTimeout(() => {
          update({
            id,
            title: 'Subscribed',
            variant: 'success',
          });
        }, 1000);

        setSubscribedDevelopersObj(old => {
          return { ...old, [developerId]: true };
        });
      } catch (e) {
        setSubscribedDevelopersObj(old => ({
          ...old,
          [developerId]: false,
        }));
      }
    },
    [subscriptionId, subscribedDevelopersObj, token]
  );

  const unsubscribeDeveloper = useCallback(
    async (developerId: number) => {
      const APIURL = NEXT_PUBLIC_BASE_API_URL;
      const url = `${APIURL}/api/developer-subscriptions/${subscriptionId}/unsubscribe`;
      try {
        // const response = await axios.
        const { id, update } = toast({
          title: 'Unsubscribing....',
          variant: 'default',
          stackable: false,
        });
        await axios.patch(
          url,
          {
            developerId: developerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setTimeout(() => {
          update({
            id,
            title: 'Unsubscribed..',
            variant: 'default',
          });
        }, 1000);
        setSubscribedDevelopersObj(old => {
          return { ...old, [developerId]: false };
        });
      } catch (e) {
        setSubscribedDevelopersObj(old => ({
          ...old,
          [developerId]: true,
        }));
      }
    },
    [subscriptionId, subscribedDevelopersObj, token]
  );

  const isDeveloperSubscribed = useCallback(
    (id: number) => {
      return subscribedDevelopersObj[id];
    },
    [subscribedDevelopersIds, subscribedDevelopersObj]
  );

  const fetchSubscribedDevelopersIds = useCallback(async () => {
    if (isLoggedIn && token) {
      const url = `${NEXT_PUBLIC_BASE_API_URL}/api/developer-subscriptions/${subscriptionId}/developer-ids`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(!isProduction && { 'ngrok-skip-browser-warning': 'true' }),
        },
      });
      const tempSubscribedDevelopersIds = response?.data?.developerIds || [];
      const obj: { [keys: number]: boolean } = {};
      tempSubscribedDevelopersIds.forEach((item: any) => {
        obj[item] = true;
      });
      const ids = Object.keys(obj).map(i => parseInt(i));

      setSubscribedDevelopersObj(old => ({ ...old, ...obj }));
      setSubscribedDevelopersIds(old => [...old, ...ids]);
    }
  }, [subscriptionId, token]);

  useEffect(() => {
    if (token && subscriptionId) {
      fetchSubscribedDevelopersIds();
    } else {
      setSubscribedDevelopersObj({});
      setSubscribedDevelopersIds([]);
    }
  }, [subscriptionId, token]);

  return (
    <subscribedDevelopersContext.Provider
      value={{
        fetchSubscribedDevelopersIds,
        subscribedDevelopersIds,
        subscribedDevelopersObj,
        isDeveloperSubscribed,
        subscribeDeveloper,
        unsubscribeDeveloper,
      }}>
      {children}
    </subscribedDevelopersContext.Provider>
  );
};

export const useSubscribedDevelopersContext = () =>
  useContext(subscribedDevelopersContext);

export default SubscribedDeveloperProvider;
