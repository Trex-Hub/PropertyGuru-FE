'use client';

import { useEffect, useRef } from 'react';

export default function ContactUsBitrixForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://cdn.bitrix24.com/b26676447/crm/form/loader_184.js?' +
        ((Date.now() / 180000) | 0);
      script.dataset.b24Form = 'inline/184/hcf9vt';
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
