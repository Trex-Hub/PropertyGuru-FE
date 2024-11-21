// app/[lang]/new-featured/layout.tsx
import React from 'react';
import AdContainer from '@/components/AdContainer';
import Script from 'next/script';
interface NewFeaturedLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function NewFeaturedLayout({
  children,
}: NewFeaturedLayoutProps) {
  return (
    <div>
      {/* <!-- CallGear --> */}
      <Script
        type='text/javascript'
        async
        src='https://app.callgear.com/static/cs.min.js?k=LYFy077156PihRninLAEnNzWIiZGnx9t'></Script>
      {/* <!-- CallGear --> */}
      <div className='lg:flex  md:flex hidden lg:justify-center lg:items-center md:justify-center md:items-center'>
        <AdContainer
          slotId='div-gpt-ad-1709644694706-0'
          slotName='/22718860182/pg-mortgage-720x90'
          minWidth='728'
          minHeight='90'
          backgroundColor='bg-[#eeeeee]'
        />
      </div>
      {children}
    </div>
  );
}
