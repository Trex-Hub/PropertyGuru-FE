import React from 'react';

export default function BottomSection() {
  return (
    <div className='relative flex my-5'>
      <div className='w-full md:h-[22rem] h-[10rem] relative overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(/bottom_panel.jpg)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}></div>
      </div>
      <div className='absolute inset-0 flex md:justify-between justify-center gap-6 md:flex-row flex-col items-center md:px-28'>
        <div className='text-white lg:text-[40px] font-senary md:text-2xl text-2xl font-semibold lg:leading-[3rem] text-center'>
          10% Down Payment Only
        </div>
        <div className='lg:text-[40px] md:text-2xl text-2xl font-semibold text-white font-senary lg:leading-[3rem] text-center'>
          Interest Free Payment Plans
        </div>
      </div>
    </div>
  );
}
