'use client';
import { useEffect, useRef } from 'react';

export default function LandingPageLeadSubmissionForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const script = document.createElement('script');
      script.src = 'https://cdn.bitrix24.com/b26676447/crm/form/loader_196.js';
      script.dataset.b24Form = 'inline/196/df17bg';
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
