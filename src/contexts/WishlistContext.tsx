'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/constants';
import { useToast } from '@/components/ui/use-toast';

const wishListContext = createContext<{
  fetchWishList: () => void;
  wishListPropertiesIds: string[];
  wishListPropertiesObj: any;
  isPropertyWishlisted: (a: string) => boolean;
  wishListProperty: (slug: string) => void;
  removeWishListProperty: (slug: string) => void;
  wishListSlugObj: { [keys: string]: boolean };
}>({
  fetchWishList: () => {},
  wishListPropertiesObj: {},
  wishListPropertiesIds: [],
  isPropertyWishlisted: () => false,
  wishListProperty: () => null,
  removeWishListProperty: () => null,
  wishListSlugObj: {},
});

const WishListProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishListPropertiesIds, setWishlistPropertiesIds] = useState<string[]>(
    []
  );

  const [wishListSlugObj, setWishListSlugObj] = useState<{
    [keys: string]: boolean;
  }>({});

  const [wishListPropertiesObj] = useState({});
  const { isLoggedIn, token } = useUser();

  useEffect(() => {}, [wishListSlugObj]);
  const toast = useToast();
  const isPropertyWishlisted = (slug: string): boolean => {
    return wishListSlugObj[slug];
  };

  const wishListProperty = async (slug: string) => {
    try {
      const API_URL = NEXT_PUBLIC_BASE_API_URL;
      setWishListSlugObj(old => ({ ...old, [slug]: true }));

      await axios
        .post(
          `${API_URL}/api/wishlist/add`,
          { slug },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .catch(() => {
          setWishListSlugObj(old => ({ ...old, [slug]: false }));
        });
    } catch (e) {
      toast.toast({
        title: 'Error updating favorite properties',
        variant: 'destructive',
      });
    }
  };

  const removeWishListProperty = async (slug: string) => {
    try {
      const API_URL = NEXT_PUBLIC_BASE_API_URL;
      setWishListSlugObj(old => ({ ...old, [slug]: false }));
      await axios.delete(`${API_URL}/api/wishlist/remove/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Call fetchWishList after successful removal
      await fetchWishList();
    } catch (error) {
      setWishListSlugObj(old => ({ ...old, [slug]: true }));
      toast.toast({
        title: 'Error removing property from favorites',
        variant: 'destructive',
      });
    }
  };

  const fetchWishList = async () => {
    if (isLoggedIn && token) {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_API_URL}/api/wishlist/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const tempWishlistProperties = response?.data?.properties || [];
        const obj: any = {};
        const ids: string[] = tempWishlistProperties.map(
          (item: any) => item.id
        );

        tempWishlistProperties.forEach((item: any) => {
          obj[item.slug] = true;
        });

        setWishListSlugObj(obj);
        setWishlistPropertiesIds(ids);
      } catch (error) {
        toast.toast({
          title: 'Error fetching favorite properties',
          variant: 'destructive',
        });
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishList();
    }
  }, [isLoggedIn]);

  return (
    <wishListContext.Provider
      value={{
        fetchWishList,
        wishListPropertiesIds,
        wishListPropertiesObj,
        isPropertyWishlisted,
        wishListProperty,
        removeWishListProperty,
        wishListSlugObj,
      }}>
      {children}
    </wishListContext.Provider>
  );
};

export const useWishListContext = () => useContext(wishListContext);

export default WishListProvider;
