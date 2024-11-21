import { ListCardLoading } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { IoShareSocialOutline } from 'react-icons/io5';

export const PriceCardLoader = () => {
  return (
    <div className='my-3 md:m-3 shadow-md p-5 font-primary md:rounded-xl overflow-hidden bg-white rounded-lg'>
      <div className='flex justify-between items-start mb-4'>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-200 h-4 w-24 rounded' />
            <div className='bg-gray-200 h-4 w-12 rounded' />
          </div>
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-200 h-4 w-16 rounded' />
            <div className='bg-gray-200 h-4 w-20 rounded' />
          </div>
        </div>
        <div className='space-y-2 text-right'>
          <div className='bg-gray-200 h-4 w-24 rounded' />
          <div className='bg-gray-200 h-4 w-12 rounded' />
        </div>
      </div>
      <div className='flex items-center space-x-2 mb-4'>
        <div className='bg-gray-200 h-8 w-16 rounded' />
        <div className='bg-gray-200 h-8 w-32 rounded' />
        <div className='bg-gray-200 h-8 w-8 rounded' />
        <div className='bg-gray-200 h-8 w-16 rounded' />
        <div className='bg-gray-200 h-8 w-16 rounded' />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex space-x-4'>
          <div className='bg-gray-200 h-10 w-32 rounded' />
          <div className='bg-gray-200 h-10 w-40 rounded border' />
        </div>
        <div className='bg-gray-200 h-10 w-24 rounded' />
      </div>
    </div>
  );
};
export const HeadingSectionLoader = () => {
  return (
    <div className='animate-pulse rounded-full bg-slate-200 h-[1.5rem] w-[16rem]  mx-4 mt-5 mb-2' />
  );
};

export const TopLabelLoader = () => {
  return (
    <div className='animate-pulse flex md:flex-row flex-col md:justify-between gap-2 p-2 py-4 md:p-4'>
      <div className='flex flex-col gap-2'>
        <div className='rounded-full bg-slate-200 h-[2.5rem] w-[20rem]' />
        <div className='rounded-full bg-slate-200 h-[1.5rem] w-[12rem]' />
      </div>
      <div className='flex justify-between gap-3 items-top max-h-[2.875rem]'>
        <Button className='p-[0.5rem] md:p-[0.75rem] pl-[0.75rem] pr-[1rem] md:w-[11.625rem] md:h-full text-[0.875rem] md:text-[1rem] leading-[1.25rem] md:leading-[1.375rem] font-[600] md:font-bold font-primary hover:bg-primary-backgroundColor hover:text-primary-labelColor hover:border-primary-loginBorder hover:border bg-primary-labelColor text-primary-whiteTextColor'>
          Enquire Now
        </Button>
        <div className='inline-flex justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground px-4 py-2 items-center h-full text-2xl md:text-3xl bg-transparent hover:bg-transparent'>
          <div className='text-primary-secondaryTextColor font-bold'>
            <IoShareSocialOutline className='text-primary-secondaryTextColor text-2xl md:text-3xl cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PropertyImagesLoader = () => {
  return (
    <div className='animate-pulse flex gap-2 justify-center md:m-2 h-[14.813rem] sm:h-[17rem] md:h-[29rem] md:rounded-xl overflow-hidden'>
      <div className='w-full md:w-[70%] h-full overflow-hidden object-fill'>
        <div className='flex w-[100%] h-[100%] relative items-center bg-slate-200'></div>
      </div>
      <div className='hidden md:flex flex-col md:w-[30%] h-full gap-2'>
        <div className='overflow-hidden h-1/2 bg-slate-200' />
        <div className='overflow-hidden h-1/2 bg-slate-200' />
      </div>
    </div>
  );
};

export const DescriptionLoader = () => {
  return (
    <div className='animate-pulse p-6 pt-7'>
      <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
        Description
      </p>
      <ul className='flex flex-col gap-3 mt-5'>
        <li className='animate-pulse rounded-full bg-slate-200 h-[2rem] w-full' />
        <li className='animate-pulse rounded-full bg-slate-200 h-[2rem] w-full' />
        <li className='animate-pulse rounded-full bg-slate-200 h-[2rem] w-full' />
      </ul>
    </div>
  );
};

export const FeaturesLoader = () => {
  return (
    <div className='animate-pulse p-6 pt-10'>
      <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
        Features and Amenities
      </p>
      <ul className='flex flex-row gap-3 mt-5'>
        <li className='animate-pulse rounded-full bg-slate-200 h-[2rem] w-full' />
        <li className='animate-pulse rounded-full bg-slate-200 h-[2rem] w-full' />
        <li className='animate-pulse rounded-full bg-slate-200 h-[2rem] w-full' />
      </ul>
    </div>
  );
};

export const PaymentPlanLoader = () => {
  return (
    <div className='animate-pulse p-6 pt-7 mt-4 w-full lg:h-[40rem] my-3 md:m-3 shadow-md font-primary md:rounded-xl overflow-hidden bg-white rounded-lg'>
      <div className='flex gap-2 font-bold'>
        <div className='bg-slate-200 h-[2rem] w-[14rem] rounded-lg' />
        <div className='bg-slate-200 h-[2rem] w-[14rem] rounded-lg' />
      </div>
      <div className='flex flex-col gap-3 font-primary mt-8'>
        <div className='bg-slate-200 h-[2rem] w-[14rem] rounded-lg' />
        <div className='md:flex flex flex-col md:flex-row gap-2 py-5 items-top'>
          <div className='md:w-1/2 flex flex-col gap-2'>
            <div className='bg-slate-200 h-[1.5rem] w-[15rem] rounded-lg' />
            <div className='bg-slate-200 h-[1.5rem] w-[10rem] rounded-lg' />
          </div>
          <div className='md:w-1/2 flex flex-col gap-2'>
            <div className='bg-slate-200 h-[1.5rem] w-[15rem] rounded-lg' />
            <div className='bg-slate-200 h-[1.5rem] w-[10rem] rounded-lg' />
          </div>
        </div>
        <div className='md:flex'>
          <div className='md:w-1/2 flex flex-col gap-7 mt-5'>
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[1.5rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[1.5rem] w-[10rem] rounded-lg' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[1.5rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[1.5rem] w-[10rem] rounded-lg' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='bg-slate-200 h-[1.5rem] w-[15rem] rounded-lg' />
              <div className='bg-slate-200 h-[1.5rem] w-[10rem] rounded-lg' />
            </div>
          </div>
          <div className='md:w-1/2 px-3 mt-5 flex flex-col gap-3'>
            <div className='flex gap-4 items-center'>
              <div className='rounded-full w-[8rem] h-[8rem] bg-slate-200' />
              <div className='flex flex-col gap-3'>
                <div className='bg-slate-200 h-[1rem] w-[10rem] rounded-lg' />
                <div className='bg-slate-200 h-[1rem] w-[10rem] rounded-lg' />
                <div className='bg-slate-200 h-[1rem] w-[10rem] rounded-lg' />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='bg-slate-200 h-[1rem] w-full rounded-lg' />
              <div className='bg-slate-200 h-[1.5rem] w-full rounded-lg' />
              <div className='bg-slate-200 h-[1.5rem] w-full rounded-lg' />
              <div className='bg-slate-200 h-[1.5rem] w-full rounded-lg' />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-slate-200 h-[3rem] w-full rounded-lg mt-8' />
    </div>
  );
};

export const FloorPlansLoader = () => {
  return (
    <div className='pt-10 mb-5 flex flex-col md:flex-row animate-pulse'>
      <div className='md:w-1/2 p-6'>
        <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold'>
          Floor Plans
        </p>
        <div className='flex flex-col my-4 md:mr-10 font-primary gap-5 mt-5'>
          <div className='bg-slate-200 h-[2.5rem] w-full rounded-lg' />
          <div className='bg-slate-200 h-[1rem] w-full rounded-lg mt-3' />
          <div className='bg-slate-200 h-[1rem] w-full rounded-lg' />
          <div className='bg-slate-200 h-[1rem] w-full rounded-lg' />
          <div className='flex gap-4 mt-16'>
            <div className='bg-slate-200 h-[2.5rem] w-full rounded-lg' />
            <div className='bg-slate-200 h-[2.5rem] w-full rounded-lg' />
          </div>
        </div>
      </div>
      <div className='md:w-1/2 bg-slate-200  mt-2 p-0 flex items-center w-full'></div>
    </div>
  );
};

export const SimilarListingsLoader = () => {
  return (
    <div className='px-2 md:px-[6rem] py-[3.625rem] bg-primary-similarlistingbg w-full text-primary-textColor items-center justify-center lg:block'>
      <p className='text-xl leading-[1.25rem] font-semibold p-2'>
        You may also like
      </p>
      <div className='mt-6'>
        <div className='grid gap-8 p-5'>
          {/* Large screens */}
          <div className='hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
          </div>
          {/* Small screens */}
          <div className='flex md:hidden overflow-x-auto gap-5'>
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
          </div>
        </div>
      </div>
    </div>
  );
};
