import SearchBar from './_sections/SearchBar';
import SearchBarResult from './_sections/SearchBarResult';
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
import { SearchBarLoader, SearchResultLoader } from './_components/Loaders';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import AdContainer from '@/components/AdContainer';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const baseUrl = process.env.BASE_FE_URL;
  return {
    title: 'Advance Search',
    description:
      ' Discover your dream home with PropertyGuru! Buy properties in UAE and explore a world of real estate opportunities. Your perfect home awaits!',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `${params?.lang}/advanced-search`,
    },
    openGraph: {
      images: ['/images/home/logo.png'],
      url: `${baseUrl}/${params?.lang}/advanced-search`,
      title: 'Advance Search - Property Guru | Buy Properties in UAE',
      locale: 'en_AE',
      type: 'website',
    },
    twitter: {
      images: ['/images/home/logo.png'],
      title: 'Advance Search - Property Guru | Buy Properties in UAE',
    },
  };
};

type AdvanceSearchParms = {
  searchParams: {
    minPrice: number;
    maxPrice: number;
    city: string;
    area: string;
    developer: string;
    propertyType: string;
    readiness: string;
    minArea: number;
    maxArea: number;
    bedroom: number | number[];
    bathroom: number | number[];
    possession: string | string[];
    amenity: string | string[];
    keyword: string;
    page: string;
    sort: string;
  };
  params: {
    lang: string;
    category: string;
  };
};

export default async function AdvanceSearch({
  searchParams,
  params,
}: AdvanceSearchParms) {
  const advanceSearchJsonLd = {
    '@type': 'WebPage',
    '@id': `${process.env.BASE_FE_URL}/${params?.lang}/advanced-search`,
    url: `${process.env.BASE_FE_URL}/${params?.lang}/advanced-search`,
    name: 'Advance Search - Buy Properties in UAE | Property Guru',
    isPartOf: { '@id': `${process.env.BASE_FE_URL}/${params?.lang}/#website` },
    datePublished: new Date('2017-11-16T13:57:43+00:00'),
    dateModified: new Date('2024-03-04T09:26:11+00:00'),
    description:
      'Discover your dream home with PropertyGuru! Buy properties in UAE and explore a world of real estate opportunities. Your perfect home awaits!',
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
          name: 'Advance Search',
          item: `${process.env.BASE_FE_URL}/${params?.lang}/advanced-search`,
        },
      ],
    },
    inLanguage: 'en-Us',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.BASE_FE_URL}/${params?.lang}/advanced-search`,
    },
  };

  return (
    <div className='md:px-20 px-0'>
      <Script id='page-action-schema' type='application/ld+json'>
        {JSON.stringify(advanceSearchJsonLd)}
      </Script>

      <div className='flex items-center px-4 md:px-6 font-primary md:py-4 mt-2 py-2'>
        <Link href='/'>
          <p className='text-[0.625rem] md:text-xs  text-primary-secondaryTextColor'>
            Home
          </p>
        </Link>
        <FiChevronRight className='text-primary-textGrayColor' />
        <p className='text-[0.625rem] md:text-xs text-primary-titleTextColor'>
          Advance Search
        </p>
      </div>
      <Suspense fallback={<SearchBarLoader />}>
        <SearchBar searchParams={searchParams} params={params} />
      </Suspense>
      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2'>
        <Suspense fallback={<SearchResultLoader />}>
          <SearchBarResult searchParams={searchParams} params={params} />
        </Suspense>
        <div className='flex flex-col gap-5 items-center justify-center md:hidden lg:hidden'>
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
        <div className='lg:w-[32%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0  h-full'>
          <div className='hidden lg:block'>
            <div className='gap-5 flex flex-col'>
              <AdContainer
                slotId='div-gpt-ad-1685538479815-0'
                slotName='/22718860182/pg-widget-right2'
                minWidth='300'
                minHeight='250'
              />
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
