'use client';
import { GrLocation } from 'react-icons/gr';
import { IoCallOutline } from 'react-icons/io5';
import { MdMailOutline } from 'react-icons/md';
import { CONTACT_US_MAP_LINK } from '@/utils/constants';
import ContactUsBitrixForm from '@/components/ContactUsBitrixForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';

export default function ContactUsForm() {
  return (
    <div className='bg-primary-backgroundColor mt-10 md:mb-14 mb-4'>
      <div className='flex flex-col p-6 gap-3 mt-10'>
        <p className='text-2xl font-bold font-primary text-primary-primaryTextColor'>
          Get In Touch
        </p>
        <p className='text-base font-primary text-primary-primaryTextColor'>
          Get in touch by filling out the form for all your real estate needs.
        </p>
        <div className='flex lg:flex-wrap xl:flex-nowrap flex-col md:flex-row mt-10 px-2 gap-10 md:gap-3'>
          <div className='gap-5 flex flex-col'>
            <ContactUsBitrixForm />
            <PropertyDetailFormButton />
          </div>
          <div className='flex'>
            <div className='border-l border-gray-300 h-[26rem]'></div>
            <div className='flex flex-col gap-2 font-primary px-4'>
              <div className='flex gap-3 items-start'>
                <GrLocation className='text-primary-textGrayColor text-base md:text-2xl' />
                <p className='text-sm text-primary-primaryTextColor'>
                  UAE – Dubai Media City – Concord <br /> Tower – 9th Floor
                </p>
              </div>
              <a
                href='tel:+97144941222'
                className='flex gap-3 items-start text-sm text-primary-primaryTextColor underline'>
                <IoCallOutline className='text-primary-textGrayColor text-base md:text-2xl' />
                +971 4 494 1222
              </a>
              <a
                href='mailto:adops@propertyguru.ae'
                className='flex gap-3 items-start text-sm  text-primary-primaryTextColor underline'>
                <MdMailOutline className='text-primary-textGrayColor text-base md:text-2xl' />
                adops@propertyguru.ae
              </a>
              <div className='w-[17rem] h-[18rem] md:w-[23rem] md:h-[24rem] rounded-xl'>
                <iframe
                  title='Map'
                  width='100%'
                  height='100%'
                  className='w-full h-full rounded-xl'
                  src={CONTACT_US_MAP_LINK}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  sandbox='allow-scripts'></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
