import { FiChevronRight } from 'react-icons/fi';
import AboutUsContent from './_sections/AboutUsContent';
import Script from 'next/script';
import AboutUsHeader from './_sections/AboutUsHeader';
import Link from 'next/link';
import AdContainer from '@/components/AdContainer';
import ContactUsBitrixForm from '@/components/ContactUsBitrixForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import { Suspense } from 'react';
import { GoogleAdVideoLoader } from '@/components/Loading';
import InsightsCarousel from '@/components/InsightsCarousel';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const baseUrl = process.env.BASE_FE_URL;

  return {
    title: `About us - Property Guru | ${params.lang}`,
    description:
      'PropertyGuru.ae is a real estate platform, owned and managed by Bright Minds Hub Marketing Management LLC, established in the United Arab Emirates in 2018. We specialize in revolutionizing the real estate experience, focusing exclusively on off-plan projects in the vibrant landscape of the UAE. What sets us apart is our direct collaboration with the top real estate developers in the region. We provide users.',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `/${params.lang}/about-us`,
    },
    openGraph: {
      images: ['/images/home/thumbnail.jpeg'],
      url: `${baseUrl}/${params.lang}/about-us`,
      title: `About Us - Property Guru | Buy Properties in UAE`,
      locale: params.lang,
      type: 'website',
    },
    twitter: {
      images: ['/images/home/thumbnail.jpeg'],
    },
  };
};

export default async function AboutUs({
  params,
}: {
  params: { lang: string };
}) {
  const breadCrumbJsonLd = {
    '@id': `${process.env.BASE_FE_URL}/${params?.lang}/#breadcrumb`,
    '@type': 'BreadcrumbList',
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
        name: 'About Us',
        item: `${process.env.BASE_FE_URL}/${params?.lang}/about-us`,
      },
    ],
  };
  return (
    <div className='flex flex-col md:px-20 px-0'>
      <Script id='bread-crumb-schema' type='application/ld+json'>
        {JSON.stringify(breadCrumbJsonLd)}
      </Script>
      <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
        <Link href='/'>
          <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor cursor-pointer'>
            Home
          </p>
        </Link>
        <FiChevronRight className='text-primary-textGrayColor' />
        <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
          About Us
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
      <AboutUsHeader />
      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2 mt-7'>
        <div className='lg:w-[70%] md:p-4 px-2 overflow-y-auto w-full'>
          <AboutUsContent />
          <div className='lg:flex  md:flex hidden lg:justify-center lg:items-center md:justify-center md:items-center'>
            <AdContainer
              slotId='div-gpt-ad-1722319824918-0'
              slotName='/22718860182/pg-homepage-content2'
              minWidth='728'
              minHeight='90'
            />
          </div>
        </div>
        <div className='lg:w-[35%] py-4 p-4 flex flex-col gap-5 lg:top-0  h-full mb-10'>
          <div className='gap-5 flex flex-col'>
            <div className='pt-6 flex shadow-lg py-4 items-center justify-center flex-col gap-4'>
              <AdContainer
                slotId='div-gpt-ad-1685538479815-0'
                slotName='/22718860182/pg-widget-right2'
                minWidth='300'
                minHeight='250'
              />
              <InsightsCarousel />
            </div>
            <ContactUsBitrixForm />
            <PropertyDetailFormButton />
          </div>
          <Suspense fallback={<GoogleAdVideoLoader />}>
            <GoogleAdVideo />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
