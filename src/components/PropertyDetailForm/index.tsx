'use client';
import { useEffect, useRef } from 'react';

export default function PropertyDetailForm({ variant }: { variant?: string }) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const script = document.createElement('script');
      script.src = 'https://cdn.bitrix24.com/b26676447/crm/form/loader_174.js';
      script.dataset.b24Form = 'inline/174/2dt6ob';
      script.dataset.skipMoving = 'true';
      script.async = true;
      formRef.current.appendChild(script);

      return () => {
        formRef.current?.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      {variant === 'mobile' ? (
        <div className='flex flex-col gap-5' id='enquire-now-mobile'>
          <div ref={formRef} className='form-container'></div>
        </div>
      ) : (
        <div className='flex flex-col gap-5' id='enquire-now'>
          <div ref={formRef} className='form-container'></div>
        </div>
      )}
    </>
  );
}
