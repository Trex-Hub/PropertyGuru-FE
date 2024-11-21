import { GoThumbsup } from 'react-icons/go';

export default function EnquiryFormSuccess() {
  return (
    <div
      className='border border-x-primary-enquiryFormBorderColor rounded-[0.625rem] shadow-md mt-5'
      id='enquire-now-success'>
      <div className='flex flex-col items-center justify-center px-16 py-20 gap-1 '>
        <GoThumbsup className='text-xl text-primary-secondaryTextColor' />
        <p className='text-base font-bold font-secondary text-primary-contactUsTextColor mb-2'>
          Thank You
        </p>
        <p className='text-sm font-normal font-primary text-primary-primaryTextColor text-center'>
          Someone will get in touch shortly to provide you with more details
        </p>
      </div>
    </div>
  );
}
