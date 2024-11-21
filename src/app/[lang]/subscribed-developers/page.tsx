import { Suspense } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import StickyButton from '@/components/StickyButton';
import Script from 'next/script';
import Link from 'next/link';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import { FeaturedPropertiesLoader } from '@/components/Loading';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import DevelopersList from './_sections/DevelopersList';
import { DevelopersListLoader } from './_components/Loaders';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import { getHomePageAds } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/GoogleAdVideo/VideoPlayer';

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
    subscriptionId: string;
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
  const { data: videoAdData } = await getHomePageAds();
  const videoUrl = videoAdData?.data?.attributes?.videoAd?.data?.attributes?.url
    ? `${NEXT_PUBLIC_ASSETS_URL}${videoAdData.data.attributes.videoAd.data.attributes.url}`
    : 'https://propertygurublob.blob.core.windows.net/image-storage/assets/IMG_0_caeff6647a.mp4';
  const token = cookies().get('token')?.value;
  if (!token) {
    return notFound();
  }
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
          Subscribed Developers
        </p>
      </div>
      <div className='lg:flex lg:flex-row flex-col w-full h-full gap-2'>
        <div className='lg:w-3/4 md:p-4 px-2 overflow-y-auto w-full'>
          <Suspense fallback={<DevelopersListLoader />}>
            <DevelopersList params={params} searchParams={searchParams} />
          </Suspense>
        </div>
        <div className='flex items-center justify-center lg:hidden'>
          <VideoPlayer
            sources={[
              {
                src: videoUrl,
                type: 'video/mp4',
              },
            ]}
            ima={{
              adTagUrl:
                'https://pubads.g.doubleclick.net/gampad/ads?iu=/22718860182/pg-video-newWeb&description_url=https%3A%2F%2Fpropertyguru.ae&tfcd=0&npa=0&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=',
            }}
          />
        </div>
        <div className='lg:w-[32%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 lg:sticky h-full'>
          <div className='hidden lg:block'>
            <div className='gap-5 flex flex-col'>
              <PropertyDetailForm />
              <PropertyDetailFormButton />
            </div>
            <VideoPlayer
              sources={[
                {
                  src: videoUrl,
                  type: 'video/mp4',
                },
              ]}
              ima={{
                adTagUrl:
                  'https://pubads.g.doubleclick.net/gampad/ads?iu=/22718860182/pg-video-newWeb&description_url=https%3A%2F%2Fpropertyguru.ae&tfcd=0&npa=0&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=',
              }}
            />
          </div>
          <Suspense fallback={<FeaturedPropertiesLoader />}>
            <SectionFeaturedProperties />
          </Suspense>
        </div>
      </div>
      <StickyButton />
    </div>
  );
}
