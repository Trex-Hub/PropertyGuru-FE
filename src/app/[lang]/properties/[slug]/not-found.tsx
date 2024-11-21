'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

const NotFound = () => {
  const { lang = '/en' } = useParams();
  return (
    <div className='flex flex-col items-center justify-center w-full h-96'>
      <h1 className='font-bold text-3xl text-center'>
        The property you are looking for is not registered with us.
      </h1>
      <Button className='my-8 p-4' asChild>
        <Link href={`/${lang}/property-list`}>Back to Property Search</Link>
      </Button>
    </div>
  );
};

export default NotFound;
