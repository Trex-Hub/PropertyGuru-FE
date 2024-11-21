'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GOOGLE_CALLBACK } from '@/configs/endpoints';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { setItem } from '@/utils/storageHelper';
import { useToast } from '@/components/ui/use-toast';

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchInterestForm, setToken } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const queryString = searchParams.toString();
    if (queryString) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${GOOGLE_CALLBACK}?${queryString}`);
          if (response.status === 200) {
            const { jwt } = response.data;
            setToken(jwt);
            setItem('token', jwt);

            router.push('/');
            toast({
              title: 'Logged in successfully',
              variant: 'success',
            });
            await fetchInterestForm(jwt);
          }
        } catch (error) {
          toast({
            title: 'Something went wrong!',
            variant: 'destructive',
          });
        }
      };
      fetchData();
    } else {
      router.push('/login'); // Uncomment if you want to redirect
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center max-w-sm w-full'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-20 h-20 border-t-4 border-green-500 border-solid rounded-full animate-spin'></div>
          </div>
        </div>
        <h1 className='text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100'>
          Logging in with Google
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mb-4'>
          Please wait while we securely log you in...
        </p>
        <div className='flex justify-center items-center space-x-2 text-green-500'>
          <span className='text-sm font-medium'>Authenticating</span>
        </div>
      </div>
    </div>
  );
}
