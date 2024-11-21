import LandingPageLeadSubmissionForm from '@/components/LandingPageLeadSubmissionForm';
import Image from 'next/image';
import Link from 'next/link';

export default function TopSection() {
  return (
    <div className='relative flex'>
      <div className='w-full lg:h-[37.3rem] md:h-[700px] h-[950px] relative'>
        <div className='absolute inset-0 bg-black opacity-40'></div>
        <Image
          height={500}
          width={1000}
          alt='Top Panel Logo'
          src='/top_panel.jpg'
          className='object-cover object-top w-full h-full'
        />
      </div>
      <div className='w-full md:w-52 lg:w-auto lg:mx-auto text-center cursor-pointer absolute my-2'>
        <Link href='/'>
          <Image
            width={200}
            height={200}
            alt='PropertyGuru Logo'
            src='/logo_2.png'
            className='opacity-100'
          />
        </Link>
      </div>
      <div className='absolute inset-0 flex md:flex-row flex-col lg:gap-32 md:gap-5 gap-5 items-center justify-center xl:px-32 lg:px-10 md:px-10 px-5 w-full  md:my-10'>
        <div className='flex flex-col xl:gap-10 lg:gap-5 md:gap-5 gap-5 lg:w-[60%] md:w-[40%]'>
          <div className='flex flex-col gap-3'>
            <div className='text-white font-quaternary font-medium text-base'>
              Long-Term, Interest-Free Monthly Payment Plans from Leading
              Developers!
            </div>
            <div className='lg:text-[41px] md:text-2xl text-2xl  font-semibold text-white font-quinary lg:leading-[3rem]'>
              Unlock High ROI Investment Opportunities in Prime Properties
            </div>
          </div>
          <div className='bg-transparent'>
            <div className='flex flex-col md:p-2 p-1 lg:p-3 md:gap-2 gap-2'>
              <div className='text-lg font-teriary text-white leading-6'>
                Discover exceptional{' '}
                <span className='font-bold'> properties </span> and secure the
                perfect
                <span className='font-bold'> mortgage </span>
                tailored to your investment goals, directly from top developers
                and banks in the UAE.
              </div>
              <div className='text-sm font-bold font-teriary text-white mb-5'>
                Enjoy ZERO Brokerage Fees!
              </div>
            </div>
          </div>
        </div>
        <div className='lg:w-[40%] md:w-[50%] px-5'>
          <LandingPageLeadSubmissionForm />
        </div>
      </div>
    </div>
  );
}
