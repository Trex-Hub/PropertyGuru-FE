import { FiChevronRight } from 'react-icons/fi';
import ContactUsHeader from './_sections/ContactUsHeader';
import ContactUsForm from './_sections/ContactUsForm';
import Script from 'next/script';
import TopDevelopers from '../_sections/TopDevelopers';
import FollowUs from './_sections/FollowUs';
import Link from 'next/link';
import { Suspense } from 'react';
import { GoogleAdVideoLoader, TopDevelopersLoader } from '@/components/Loading';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import AdContainer from '@/components/AdContainer';
import InsightsCarousel from '@/components/InsightsCarousel';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const baseUrl = process.env.BASE_FE_URL;
  return {
    title: 'Contact Us - Propertyguru.ae | Buy Properties in Dubai',
    description:
      'Looking to buy a new home or invest in a property in Dubai & the UAE? We’ve got you covered! Fill in the below form, and one of our specialized real estate agents will get in touch with you within 24 hours. Your Name Your Email Your Contact Details',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `${params?.lang}/contact-us`,
    },
    openGraph: {
      images: ['/images/home/thumbnail.jpeg'],
      url: `${baseUrl}/${params?.lang}/contact-us`,
      title: 'Contact Us - Propertyguru.ae | Buy Properties in Dubai',
      locale: 'en_AE',
      type: 'website',
    },
    twitter: {
      images: ['/images/home/thumbnail.jpeg'],
      title: 'Contact Us - Propertyguru.ae | Buy Properties in Dubai',
    },
  };
};

export default async function ContactUs({
  params,
}: {
  params: { lang: string };
}) {
  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${process.env.BASE_FE_URL}/${params?.lang}/contact-us/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${process.env.BASE_FE_URL}/${params?.lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: `${process.env.BASE_FE_URL}/${params?.lang}/contact-us`,
      },
    ],
  };

  return (
    <div>
      <div className='md:px-20 px-0 bg-primary-settingsBackgroundColor'>
        <Script id='bread-crumb-schema' type='application/ld+json'>
          {JSON.stringify(breadcrumbList)}
        </Script>
        <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
          <Link href='/'>
            <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
              Home
            </p>
          </Link>
          <FiChevronRight className='text-primary-textGrayColor' />
          <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
            Contact Us
          </p>
        </div>
        <div className='flex justify-center items-center md:hidden py-2'>
          <AdContainer
            slotId='div-gpt-ad-1727178570220-0'
            slotName='/22718860182/pg-mob-leaderboard'
            minWidth='300'
            minHeight='250'
          />
        </div>
        <ContactUsHeader />
        <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2'>
          <div className='lg:w-[70%] md:p-4 px-2 overflow-y-auto w-full'>
            <ContactUsForm />
          </div>
          <div className='lg:w-[40%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 h-full md:mb-20 mb-4'>
            <div className='flex justify-center  shadow-lg rounded-xl py-4'>
              <div className='py-5 flex items-center justify-center flex-col gap-4'>
                <AdContainer
                  slotId='div-gpt-ad-1685538479815-0'
                  slotName='/22718860182/pg-widget-right2'
                  minWidth='300'
                  minHeight='250'
                />

                <InsightsCarousel />
              </div>
            </div>
            <Suspense fallback={<GoogleAdVideoLoader />}>
              <GoogleAdVideo />
            </Suspense>

            <FollowUs />
          </div>
        </div>
      </div>
      <Suspense fallback={<TopDevelopersLoader />}>
        <TopDevelopers />
      </Suspense>
    </div>
  );
}
