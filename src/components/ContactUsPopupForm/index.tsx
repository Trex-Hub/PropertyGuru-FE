'use client';

import { useEffect, useRef } from 'react';

export default function ContactUsPopupForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://cdn.bitrix24.com/b26676447/crm/form/loader_186.js?' +
        ((Date.now() / 180000) | 0);
      script.dataset.b24Form = 'click/186/pzlnr1';
      script.dataset.skipMoving = 'true';
      script.async = true;
      formRef.current.appendChild(script);

      return () => {
        formRef.current?.removeChild(script);
      };
    }
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <div ref={formRef} className='form-container'></div>
    </div>
  );
}
