import { lang } from '@/utils/utilities';
import { redirect } from 'next/navigation';

export default function Properties() {
  redirect(`/${lang}`);
}
