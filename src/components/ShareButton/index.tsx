import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BASE_FE_URL, WHATSAPP_NUMBER } from '@/utils/constants';
import { getWhatsAppLink } from '@/utils/utilities';
import { BsCopy } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { IoMailOutline, IoShareSocialOutline } from 'react-icons/io5';
import { useToast } from '../ui/use-toast';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface ShareButtonProps {
  url?: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  const shareUrl = url ? `${BASE_FE_URL}${url}` : `${BASE_FE_URL}${pathname}`;
  const handleCopyClick = useCallback(async () => {
    try {
      // Previously window.location.href was used to copy text to clipboard which was not working when ShareButton was being used in ListCard. Made this more dynmaic by accepting slug from props. Which is passed using usePathname or data.slug.
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Copied to clipboard!',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleMailClick = useCallback(() => {
    window.open(`mailto:?body=${encodeURIComponent(shareUrl)}`);
  }, [shareUrl]);

  const handleWhatsAppClick = useCallback(() => {
    const message = shareUrl;
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank');
  }, [shareUrl]);
  return (
    <Popover>
      <PopoverTrigger>
        <IoShareSocialOutline className='text-primary-secondaryTextColor text-2xl md:text-3xl cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent className='w-52'>
        <div className='flex flex-col gap-4 p-1 font-primary'>
          <p className='text-primary-primaryTextColor text-base'>Share Now</p>
          <div className='flex gap-5'>
            <div
              className='flex flex-col justify-center items-center gap-1 cursor-pointer'
              onClick={handleCopyClick}
              onKeyDown={handleCopyClick}
              tabIndex={0}
              role='button'>
              <div className='bg-primary-iconBackgroundColor rounded-md p-2'>
                <BsCopy className='text-black' />
              </div>
              <p className='text-primary-primaryTextColor text-sm'>Copy</p>
            </div>

            <div
              className='flex flex-col justify-center items-center gap-1 cursor-pointer'
              onClick={handleWhatsAppClick}
              onKeyDown={handleWhatsAppClick}
              tabIndex={0}
              role='button'>
              <div className='bg-primary-iconBackgroundColor rounded-md p-2'>
                <FaWhatsapp className='text-black' />
              </div>
              <p className='text-primary-primaryTextColor text-sm'>WhatsApp</p>
            </div>
            <div
              className='flex flex-col justify-center items-center gap-1 cursor-pointer'
              onClick={handleMailClick}
              onKeyDown={handleMailClick}
              tabIndex={0}
              role='button'>
              <div className='bg-primary-iconBackgroundColor rounded-md p-2'>
                <IoMailOutline className='text-black' />
              </div>
              <p className='text-primary-primaryTextColor text-sm'>Mail</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
