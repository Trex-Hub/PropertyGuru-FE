export default function AboutUsHeader() {
  return (
    <div className='px-3 md:px-6'>
      <div className='bg-primary-bannerBackgroundColor md:px-6'>
        <div className='p-6 flex flex-col font-primary gap-6 justify-center items-center'>
          <h1 className='text-2xl md:text-[2.5rem] font-bold text-primary-titleTextColor'>
            About Us
          </h1>
          <div className='flex flex-col gap-1'>
            <p className='text-base text-primary-primaryTextColor text-center'>
              PropertyGuru.ae is a real estate platform, owned and managed by
              Bright Minds Hub Marketing Management LLC, established in the
              United Arab Emirates in{' '}
              <span className='font-bold text-base text-primary-primaryTextColor'>
                2018.{' '}
              </span>
              We revolutionize the real estate experience, specializing in
              off-plan projects in the UAE. Collaborating directly with top
              developers, we offer comprehensive details on off-plan projects,
              including starting prices, handover dates, features, amenities,
              and payment plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
