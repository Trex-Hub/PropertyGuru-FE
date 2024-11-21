import { ListCardLoading } from '@/components/Loading';

export const SearchBarLoader = () => {
  return (
    <div className='flex flex-col w-full animate-pulse'>
      <div className='flex  w-full lg:rounded-[1.25rem] h-[3rem] md:h-[4.75rem] lg:mb-5 mb-1 overflow-x-auto shadow-md'>
        <div className='flex items-center px-5 py-3 font-primary lg:gap-6 gap-3 '>
          <div className='w-[14rem] appearance-none  text-xs md:text-sm bg-slate-200 rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold '></div>
          <div className='w-[14rem] appearance-none  text-xs md:text-sm bg-slate-200 rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold '></div>
          <div className='w-[14rem] appearance-none  text-xs md:text-sm bg-slate-200 rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold '></div>
          <div className='w-[14rem] appearance-none  text-xs md:text-sm bg-slate-200 rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold '></div>
          <div className='w-[14rem] appearance-none  text-xs md:text-sm bg-slate-200 rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold '></div>
          <div className='w-[10rem] appearance-none  text-xs md:text-sm bg-slate-200 rounded-sm md:rounded-xl px-4 py-2 h-[1.875rem] md:h-[3rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between font-semibold '></div>
        </div>
      </div>
    </div>
  );
};

export const SearchResultLoader = () => {
  return (
    <div className='px-2  w-full text-primary-textColor items-center justify-center lg:block pb-5 animate-pulse'>
      <p className='text-sm font-semibold lg:text-2xl text-primary-primaryTextColor font-secondary mt-5'>
        Showing Properties
      </p>
      <div className='mt-6'>
        <div className='grid gap-8 p-5'>
          {/* Large screens */}
          <div className='hidden md:grid lg:grid-cols-1 xl:grid-cols-2 gap-8'>
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
            <ListCardLoading />
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
