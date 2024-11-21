import { Suspense } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Script from 'next/script';
import Link from 'next/link';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import {
  FeaturedPropertiesLoader,
  GoogleAdVideoLoader,
} from '@/components/Loading';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import SearchBar from '../advanced-search/_sections/SearchBar';
import DevelopersList from './_sections/DevelopersList';
import { DevelopersListLoader } from './_components/Loaders';
import { SearchBarLoader } from '../advanced-search/_components/Loaders';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import AdContainer from '@/components/AdContainer';
import InsightsCarousel from '@/components/InsightsCarousel';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const baseUrl = process.env.BASE_FE_URL;
  return {
    title: 'Top property developers in dubai | Propertyguru',
    description:
      'Discover luxury living with the Top property developers in Dubai at Propertyguru. Unparalleled expertise, exquisite designs, and prime locations await you.',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `${params?.lang}/developers`,
    },
    openGraph: {
      images: ['/images/home/thumbnail.jpeg'],
      url: `${baseUrl}/${params?.lang}/`,
      title: 'Our top developers - Property Guru | Buy Properties in UAE',
      locale: 'en_AE',
      type: 'website',
    },
    twitter: {
      images: ['/images/home/thumbnail.jpeg'],
      title: 'Our top developers - Property Guru | Buy Properties in UAE',
    },
  };
};

type DeveloperParams = {
  searchParams: {
    page: string;
  };
  params: {
    lang: string;
  };
};

export default async function Developers({
  searchParams,
  params,
}: DeveloperParams) {
  const developerJsonLd = {
    '@type': 'WebPage',
    '@id': `${process.env.BASE_FE_URL}/${params?.lang}/developers`,
    url: `${process.env.BASE_FE_URL}/${params?.lang}/developers`,
    name: 'Top property developers in dubai | Propertyguru',
    isPartOf: { '@id': `${process.env.BASE_FE_URL}/${params?.lang}/#website` },
    datePublished: new Date('2017-11-16T13:57:43+00:00'),
    dateModified: new Date('2024-03-04T09:26:11+00:00'),
    description:
      'Discover luxury living with the Top property developers in Dubai at Propertyguru. Unparalleled expertise, exquisite designs, and prime locations await you.',
    breadcrumb: {
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
          name: 'Our top developers',
          item: `${process.env.BASE_FE_URL}/${params?.lang}/developers`,
        },
      ],
    },
    inLanguage: 'en-Us',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.BASE_FE_URL}/${params?.lang}/developers`,
    },
  };

  return (
    <div className='md:px-20 px-0'>
      <Script id='page-action-schema' type='application/ld+json'>
        {JSON.stringify(developerJsonLd)}
      </Script>
      <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
        <Link href='/'>
          <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
            Home
          </p>
        </Link>
        <FiChevronRight className='text-primary-textGrayColor' />
        <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
          Our Top Developers
        </p>
      </div>
      <Suspense fallback={<SearchBarLoader />}>
        <SearchBar searchParams={searchParams} params={params} />
      </Suspense>
      <div className='flex justify-center items-center md:hidden py-2'>
        <AdContainer
          slotId='div-gpt-ad-1727178570220-0'
          slotName='/22718860182/pg-mob-leaderboard'
          minWidth='300'
          minHeight='250'
        />
      </div>

      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2'>
        <div className='lg:w-3/4 md:p-4 px-2 overflow-y-auto w-full'>
          <Suspense fallback={<DevelopersListLoader />}>
            <DevelopersList params={params} searchParams={searchParams} />
          </Suspense>
        </div>
        <div className='flex flex-col gap-5 items-center justify-center lg:hidden'>
          <AdContainer
            slotId='div-gpt-ad-1727175348445-0'
            slotName='/22718860182/pg-widget-right1'
            minWidth='300'
            minHeight='250'
          />

          <Suspense fallback={<GoogleAdVideoLoader />}>
            <GoogleAdVideo />
          </Suspense>
        </div>
        <div className='lg:w-[32%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 h-full'>
          <div className='hidden lg:block'>
            <div className='gap-5 flex flex-col'>
              <div className='flex justify-center  shadow-lg rounded-xl py-4'>
                <div className='pt-6 flex items-center justify-center flex-col gap-4'>
                  <AdContainer
                    slotId='div-gpt-ad-1685538479815-0'
                    slotName='/22718860182/pg-widget-right2'
                    minWidth='300'
                    minHeight='250'
                  />
                  <InsightsCarousel />
                </div>
              </div>
              <PropertyDetailForm />
              <PropertyDetailFormButton />
            </div>
            <Suspense fallback={<GoogleAdVideoLoader />}>
              <GoogleAdVideo />
            </Suspense>
          </div>
          <Suspense fallback={<FeaturedPropertiesLoader />}>
            <SectionFeaturedProperties />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
