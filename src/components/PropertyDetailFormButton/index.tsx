'use client';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/utils/constants';
import { getWhatsAppLink } from '@/utils/utilities';
import { Button } from '@nextui-org/react';
import { useCallback } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCallOutline } from 'react-icons/io5';

export default function PropertyDetailFormButton() {
  const handleCallClick = useCallback(() => {
    window.location.href = `tel:+${PHONE_NUMBER}`;
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const message = 'Hello, I would like to enquire about your services.';
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank');
  }, [WHATSAPP_NUMBER, getWhatsAppLink]);
  return (
    <div className='w-full flex gap-2'>
      <Button
        type='button'
        onClick={handleCallClick}
        className='w-full border border-primary-loginBorder bg-primary-backgroundColor text-sm text-primary-loginTextColor font-semibold py-2 rounded-md hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex gap-2'>
        <IoCallOutline />
        Call Us
      </Button>
      <Button
        type='button'
        onClick={handleWhatsAppClick}
        className='w-full border border-primary-loginBorder bg-primary-backgroundColor text-sm text-primary-loginTextColor font-semibold py-2 rounded-md hover:bg-primary-labelColor hover:text-primary-whiteTextColor flex gap-2'>
        <FaWhatsapp />
        WhatsApp
      </Button>
    </div>
  );
}
