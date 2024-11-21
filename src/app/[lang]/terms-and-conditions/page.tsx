import { FiChevronRight } from 'react-icons/fi';
import TermsAndConditionContent from './_sections/TermsAndConditionContent';
import Script from 'next/script';
import Link from 'next/link';
import ContactUsBitrixForm from '@/components/ContactUsBitrixForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import { Suspense } from 'react';
import { GoogleAdVideoLoader } from '@/components/Loading';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import AdContainer from '@/components/AdContainer';
import InsightsCarousel from '@/components/InsightsCarousel';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const baseUrl = process.env.BASE_FE_URL;

  return {
    title: 'Terms and Conditions - Propertyguru.ae | Buy Properties in Dubai',
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
      canonical: `/${params.lang}/terms-and-conditions`,
    },
    openGraph: {
      images: ['/images/home/thumbnail.jpeg'],
      url: `${baseUrl}/${params.lang}/terms-and-conditions`,
      title: 'Terms and Conditions - Propertyguru.ae | Buy Properties in Dubai',
      locale: params.lang,
      type: 'website',
    },
    twitter: {
      images: ['/images/home/thumbnail.jpeg'],
    },
  };
};

export default async function TermsAndCondition({
  params,
}: {
  params: { lang: string };
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${process.env.BASE_FE_URL}/${params.lang}/terms-and-conditions/`,
        url: `${process.env.BASE_FE_URL}/${params.lang}/terms-and-conditions/`,
        name: 'Terms and Conditions - Propertyguru.ae | Buy Properties in Dubai',
        isPartOf: {
          '@id': `${process.env.BASE_FE_URL}/${params.lang}/#website`,
        },
        datePublished: '2014-10-22T12:36:54+00:00',
        dateModified: '2024-05-07T09:06:50+00:00',
        breadcrumb: {
          '@id': `${process.env.BASE_FE_URL}/${params.lang}/terms-and-conditions/#breadcrumb`,
        },
        inLanguage: 'en-US',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [
              `${process.env.BASE_FE_URL}/${params.lang}/terms-and-conditions/`,
            ],
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${process.env.BASE_FE_URL}/${params.lang}/terms-and-conditions/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${process.env.BASE_FE_URL}/${params.lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Terms and Conditions',
            item: `${process.env.BASE_FE_URL}/${params.lang}/terms-and-conditions`,
          },
        ],
      },
    ],
  };
  return (
    <div className='flex flex-col md:px-20 px-0'>
      <Script id='bread-crumb-schema' type='application/ld+json'>
        {JSON.stringify(jsonLd)}
      </Script>
      <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
        <Link href='/'>
          <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
            Home
          </p>
        </Link>
        <FiChevronRight className='text-primary-textGrayColor' />
        <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
          Terms and Conditions
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
      <p className='text-2xl md:text-[2.5rem] font-bold font-secondary text-primary-contactUsTextColor px-4 md:px-6 mt-7'>
        Terms and Conditions
      </p>
      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2 my-7'>
        <div className='lg:w-[70%] md:p-4 px-2 overflow-y-auto w-full'>
          <TermsAndConditionContent />
        </div>
        <div className='lg:w-[40%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 h-full md:mb-20 mb-4'>
          <div className='gap-5 flex flex-col p-4'>
            <div className=' shadow-lg py-5 flex items-center justify-center flex-col gap-4'>
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
          <SectionFeaturedProperties />
        </div>
      </div>
    </div>
  );
}
