export function DeveloperListCardLoading() {
  return (
    <div className='animate-pulse flex gap-5 w-[20rem] md:w-[25.5rem] h-[32.5rem]  transform transition-transform duration-300 hover:scale-[1.001]  hover:shadow-xl '>
      <div className='w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto group h-full'>
        {/* image */}
        <div className='image h-[17.5rem] w-full bg-slate-200 rounded-t-[1.25rem]' />
        <div className='p-4 bg-white shadow-md rounded-b-[12px] font-primary h-[15rem]'>
          {/* title */}
          <div className='w-[15rem] h-[1.5rem] bg-slate-200 rounded-full' />
          <div className='flex flex-col gap-2 items-center my-4'>
            <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
            <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
            <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
          </div>
          <div className='flex justify-between items-center '>
            <div className='w-[8rem] h-[2rem] bg-slate-200 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
}

export const DevelopersListLoader = () => {
  return (
    <div className='px-2  w-full text-primary-textColor items-center justify-center lg:block'>
      <p className='text-base font-bold lg:text-[2rem] text-primary-primaryTextColor lg:font-bold font-secondary mt-5'>
        My Favorite Developers
      </p>
      <div className='mt-6'>
        <div className='grid gap-8 p-5'>
          {/* Large screens */}
          <div className='hidden md:grid lg:grid-cols-1 xl:grid-cols-2 gap-8'>
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
          </div>
          {/* Small screens */}
          <div className='flex md:hidden overflow-x-auto gap-5'>
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
            <DeveloperListCardLoading />
          </div>
        </div>
      </div>
    </div>
  );
};
