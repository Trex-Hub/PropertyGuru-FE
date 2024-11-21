'use client';
import { useLoading } from '@/contexts/LoadingContext';
import Image from 'next/image';
import { useEffect } from 'react';
import Modal from './ui/modal';

export default function Loader() {
  const { isLoading, setIsLoading } = useLoading();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, [setIsLoading, isLoading]);
  return (
    <Modal visible={isLoading} className='transition-all bg-transparent'>
      <Image
        src='/images/loader/loader.gif'
        alt='loader'
        unoptimized
        width={200}
        height={200}
      />
    </Modal>
  );
}
