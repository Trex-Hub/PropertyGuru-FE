export default function ContactUsHeader() {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <h1 className='font-secondary text-[2.5rem] font-bold text-primary-primaryTextColor'>
        Contact Us
      </h1>
      <div className='flex flex-col justify-center items-center font-primary px-4 text-center'>
        <p className='text-primary-textColor font-normal md:text-base text-sm'>
          Looking to buy a new home or invest in a property in Dubai & the UAE?
          We’ve got you covered!
        </p>
        <p className='text-primary-textColor  md:text-base text-sm'>
          Fill in the below form, and one of our specialized real estate agents
          will get in touch with you within 24 hours.
        </p>
      </div>
    </div>
  );
}
