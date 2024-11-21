import Script from 'next/script';
import { FiChevronRight } from 'react-icons/fi';
import MortgageCalculatorHeader from './MortgageCalculatorHeader';
import MortgageCalculatorForm from './MortgageCalculatorForm';
import Link from 'next/link';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import AdContainer from '@/components/AdContainer';
import { Suspense } from 'react';
import {
  FeaturedPropertiesLoader,
  GoogleAdVideoLoader,
  NewLaunchesLoading,
} from '@/components/Loading';
import { ResponseStatusEnum } from '@/models/common';
import { getNewLaunchedProperties } from '@/services/properties';
import { INITIAL_PROPERTIES_ITEMS_PER_PAGE } from '@/utils/constants';
import NewLaunches from './NewLaunches';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import InsightsCarousel from '@/components/InsightsCarousel';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const baseUrl = process.env.BASE_FE_URL;

  return {
    title: 'Mortgage Calculator UAE | Propertyguru',
    description:
      "Discover your monthly payments with PropertyGuru's mortgage calculator UAE. Plan your finances wisely and explore your dream home affordability.",
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `${params?.lang}/mortgage-calculator`,
    },
    openGraph: {
      images: ['/images/home/thumbnail.jpeg'],
      url: `${baseUrl}/${params?.lang}/mortgage-calculator`,
      title: 'Mortgage Calculator UAE | Propertyguru',
      locale: 'en_AE',
      type: 'website',
    },
    twitter: {
      images: ['/images/home/thumbnail.jpeg'],
    },
  };
};
type MortgageCalculatorParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };
  params: {
    lang: string;
  };
};

export default async function MortgageCalculator({
  searchParams,
  params,
}: MortgageCalculatorParams) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/`,
        url: `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/`,
        name: 'Mortgage Calculator UAE | Propertyguru',
        isPartOf: {
          '@id': `${process.env.BASE_FE_URL}/${params.lang}/#website`,
        },
        primaryImageOfPage: {
          '@id': `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/#primaryimage`,
        },
        image: {
          '@id': `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/#primaryimage`,
        },
        thumbnailUrl: `${process.env.BASE_FE_URL}/${params.lang}/images/home/mortgage.png`,
        datePublished: '2021-11-22T13:42:28+00:00',
        dateModified: '2024-04-02T04:57:45+00:00',
        description:
          "Discover your monthly payments with PropertyGuru's mortgage calculator UAE. Plan your finances wisely and explore your dream home affordability.",
        breadcrumb: {
          '@id': `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/#breadcrumb`,
        },
        inLanguage: 'en-US',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [
              `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/`,
            ],
          },
        ],
      },
      {
        '@type': 'ImageObject',
        inLanguage: 'en-US',
        '@id': `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/#primaryimage`,
        url: `${process.env.BASE_FE_URL}/${params.lang}/images/home/mortgage.png`,
        contentUrl: `${process.env.BASE_FE_URL}/${params.lang}/images/home/mortgage.png`,
        width: 665,
        height: 382,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${process.env.BASE_FE_URL}/${params.lang}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Mortgage Calculator',
            item: `${process.env.BASE_FE_URL}/${params.lang}/mortgage-calculator`,
          },
        ],
      },
    ],
  };
  const { data: newLaunchPropertiesData, status: newLaunchPropertiesStatus } =
    await getNewLaunchedProperties(
      searchParams.launchedPropertyType,
      0,
      INITIAL_PROPERTIES_ITEMS_PER_PAGE
    );
  return (
    <div className='md:px-20 px-0 bg-primary-settingsBackgroundColor'>
      <Script id='bread-crumb-schema' type='application/ld+json'>
        {JSON.stringify(jsonld)}
      </Script>
      <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
        <Link href='/'>
          <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
            Home
          </p>
        </Link>
        <FiChevronRight className='text-primary-textGrayColor' />
        <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
          Mortgage Calculator
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
      <MortgageCalculatorHeader />
      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2'>
        <div className='lg:w-[75%] md:p-4 px-2 overflow-y-auto w-full mt-5 h-full'>
          <MortgageCalculatorForm />
          <Suspense fallback={<NewLaunchesLoading />}>
            {newLaunchPropertiesStatus === ResponseStatusEnum.SUCCESS ? (
              <NewLaunches
                searchParams={searchParams}
                newLaunchProperties={newLaunchPropertiesData.data}
                params={params}
              />
            ) : null}
          </Suspense>
        </div>
        <div className='lg:w-[40%] pt-4 lg:p-4 flex  flex-col gap-5 lg:top-0  h-full md:bg-primary-settingsBackgroundColor bg-primary-backgroundColor'>
          <div className='lg:p-0 p-4 mt-5'>
            <div className='gap-5 flex flex-col'>
              <div className='flex justify-center  shadow-lg rounded-xl py-4'>
                <div className='pt-6 flex items-center justify-center flex-col gap-4'>
                  <AdContainer
                    slotId='div-gpt-ad-1723274488140-0'
                    slotName='/22718860182/pg-mortgage-300x250'
                    minWidth='300'
                    minHeight='250'
                  />
                  <InsightsCarousel />
                </div>
              </div>
              <PropertyDetailForm />
              <PropertyDetailFormButton />
            </div>
          </div>
          <Suspense fallback={<GoogleAdVideoLoader />}>
            <GoogleAdVideo />
          </Suspense>

          <Suspense fallback={<FeaturedPropertiesLoader />}>
            <SectionFeaturedProperties />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
