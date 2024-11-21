import { ListCardLoading } from '@/components/Loading';

export const DeveloperDetailsLoader = () => {
  return (
    <div className='animate-pulse flex flex-col md:px-0 px-4'>
      <div className=' rounded-full bg-slate-200 h-[2rem] w-[20rem] mt-5  mb-5' />

      <div className='flex w-[100%] h-[15rem] relative items-center'>
        <div className='w-[100%] h-[100%] bg-slate-200 rounded-xl'></div>
      </div>
      <div className='flex flex-col gap-2 my-4 mt-5'>
        <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-full bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-[10rem] bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-[15rem] bg-slate-200 rounded-full mt-3' />
        <div className='h-[0.8rem] w-[15rem]  bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-[15rem]  bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-[15rem] bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-[15rem]  bg-slate-200 rounded-full' />
        <div className='h-[0.8rem] w-[15rem]  bg-slate-200 rounded-full' />
      </div>
      <div className='border-t border-primary-loginBorder my-5'></div>
    </div>
  );
};
export const DeveloperPropertiesLoader = () => {
  return (
    <div className=' w-full text-primary-textColor lg:block'>
      <div className='flex justify-between '>
        <div className='flex flex-col gap-1'>
          <div className='rounded-full bg-slate-200 h-[1.5rem] w-[21rem]' />
          <div className='rounded-full bg-slate-200 h-[1.8rem] w-[7rem] ' />
        </div>
        <div className='rounded-xl bg-slate-200 h-[4rem] w-[10rem]' />
      </div>
      <div className='mt-6'>
        <div className='grid gap-8 p-5'>
          {/* Large screens */}
          <div className='hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <ListCardLoading />
            <ListCardLoading />
          </div>
          {/* Small screens */}
          <div className='flex md:hidden overflow-x-auto gap-5'>
            <ListCardLoading />
            <ListCardLoading />
          </div>
        </div>
      </div>
    </div>
  );
};
