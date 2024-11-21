'use client';
import Image from 'next/image';

export default function MeetOurTeam() {
  // const handleLinkedInClick = useCallback(() => {
  //   window.open(LINKEDIN_LINK, '_blank');
  // }, []);
  // const handleTwitterClick = useCallback(() => {
  //   window.open(TWITTER_LINK, '_blank');
  // }, []);
  return (
    <div className='md:px-6'>
      <div className='bg-primary-bannerBackgroundColor rounded-[0.625rem]'>
        <div className='md:p-10 md:py-10 py-10 flex flex-col gap-10'>
          <p className='text-2xl md:text-[2rem] text-primary-secondaryTextColor font-secondary md:px-0 px-10'>
            Meet Our Team
          </p>
          {/* <p className='text-xl font-bold text-primary-primaryTextColor font-primary  md:px-0 px-10'>
            The Founder
          </p>
          <div className='flex flex-col md:flex-row gap-10 md:items-center  md:px-0 px-10'>
            <div className='md:w-[17.438rem] w-[10.438rem]'>
              <Image
                className='w-full rounded-full'
                width={167}
                height={167}
                src='/profile.png'
                alt='Profile photo'
              />
            </div>
            <div className='flex flex-col font-primary md:px-10 gap-2'>
              <p className='text-2xl font-bold'>Alex Thomas</p>
              <p className='text-base font-bold'>CEO</p>
              <p className='text-base '>
                Our CEO leads PropertyGuru.ae with a visionary approach, driving
                innovation and excellence in the off-plan real estate market.
              </p>
              <div className='flex text-primary-secondaryTextColor mt-3 gap-5 cursor-pointer'>
                <FaLinkedin onClick={handleLinkedInClick} />
                <RiTwitterXFill onClick={handleTwitterClick} />
              </div>
            </div>
          </div> */}
          <div className='flex flex-col font-primary gap-2'>
            <p className='text-xl font-bold text-primary-primaryTextColor  md:px-0 px-10'>
              The Team
            </p>
            <p className='text-base text-primary-titleTextColor  md:px-0 px-10'>
              Meet the dedicated team behind PropertyGuru.ae, committed to
              guiding you through every step of your real estate journey.
            </p>
            <div className='w-[23.125rem] h-[22.313rem] md:w-full md:h-full'>
              <Image
                className='w-full h-full'
                width={846}
                height={357}
                src='/team.png'
                alt='Team photo'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
