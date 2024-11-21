import { Suspense } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { ResponseStatusEnum } from '@/models/common';
import logger from '@/utils/logger';
import { HeadingSectionLoader } from '../../properties/[slug]/_components/Loaders';
import HeadingSection from '../_sections/HeadingSection';
import { getDeveloperDetails } from '@/services/developers';
import DeveloperDetails from '../_sections/DeveloperDetails';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import {
  FeaturedPropertiesLoader,
  GoogleAdVideoLoader,
  TopDevelopersLoader,
} from '@/components/Loading';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import TopDevelopers from '../../_sections/TopDevelopers';
import DeveloperProperties from '../_sections/DeveloperProperties';
import {
  DeveloperDetailsLoader,
  DeveloperPropertiesLoader,
} from './_components/Loaders';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import { ellipsesText } from '@/utils/utilities';
import AdContainer from '@/components/AdContainer';
import InsightsCarousel from '@/components/InsightsCarousel';

async function getImageMimeType(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.headers.get('Content-Type');
  } catch (error) {
    logger.error('Error fetching image MIME type:', error);
    return 'image/jpeg';
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  const { data: developerDetailsData, status: developerDetailsStatus } =
    await getDeveloperDetails(params.slug);
  const attributes = developerDetailsData?.data[0]?.attributes;

  if (developerDetailsStatus === ResponseStatusEnum.SUCCESS) {
    const metaSocial = attributes?.metaSocial ?? [];

    if (metaSocial.length > 0) {
      const socialMetadata = await Promise.all(
        metaSocial.map(async (social: any) => {
          const imageUrl = social.image.data?.attributes?.url
            ? `${NEXT_PUBLIC_ASSETS_URL}${social.image.data.attributes.url}`
            : null;
          if (!imageUrl) {
            return null;
          }

          const imageMimeType = await getImageMimeType(imageUrl);
          return {
            network: social.socialNetwork.toLowerCase(),
            title: social.title,
            description: social.description,
            image: {
              url: imageUrl,
              alt:
                social.image.data.attributes.alternativeText ??
                'Default Alt Text',
              type: imageMimeType ?? 'image/jpeg',
            },
          };
        })
      ).then(results => results.filter(Boolean)); // Filter out null results

      const openGraphData = socialMetadata.find(
        meta => meta.network === 'facebook'
      );

      const twitterData = socialMetadata.find(
        meta => meta.network === 'twitter'
      );

      const openGraphImages = openGraphData ? [openGraphData.image] : [];
      const twitterImages = twitterData ? [twitterData.image] : [];

      return {
        title: attributes?.seo?.metaTitle,
        description: attributes?.seo?.metaDescription,
        openGraph: {
          title: openGraphData?.title || attributes?.seo?.metaTitle,
          description:
            openGraphData?.description || attributes?.seo?.metaDescription,
          images: openGraphImages.length
            ? openGraphImages
            : [
                {
                  url: `${NEXT_PUBLIC_ASSETS_URL}${attributes?.ogImageLinkedIn?.data?.attributes?.url}`,
                  alt:
                    attributes?.ogImageLinkedIn?.data?.attributes
                      ?.alternativeText ?? 'Default Alt Text',
                  type:
                    (await getImageMimeType(
                      `${NEXT_PUBLIC_ASSETS_URL}${attributes?.ogImageLinkedIn?.data?.attributes?.url}`
                    )) ?? 'image/jpeg',
                },
              ],
        },
        twitter: {
          title: twitterData?.title || attributes?.seo?.metaTitle,
          description:
            twitterData?.description || attributes?.seo?.metaDescription,
          images: twitterImages.length
            ? twitterImages
            : [
                {
                  url: `${NEXT_PUBLIC_ASSETS_URL}${attributes?.ogImage?.data?.attributes?.url}`,
                  alt:
                    attributes?.ogImage?.data?.attributes?.alternativeText ??
                    'Default Alt Text',
                  type:
                    (await getImageMimeType(
                      `${NEXT_PUBLIC_ASSETS_URL}${attributes?.ogImage?.data?.attributes?.url}`
                    )) ?? 'image/jpeg',
                },
              ],
        },
        robots: attributes?.seo?.metaRobots,
        alternates: {
          canonical: `/${params?.lang}/estate_developer/${params.slug}`,
        },
        keywords: attributes?.seo?.keywords,
      };
    } else {
      logger.error('No metaSocial data available');
    }
  }

  return {
    title: attributes?.title,
    description: ellipsesText(attributes?.discription, 150),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${params?.lang}/estate_developer/${params.slug}`,
    },
  };
}

export default async function DeveloperDetailsPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const { data: developerDetailsData } = await getDeveloperDetails(params.slug);
  const developerDetails = developerDetailsData?.data?.length
    ? developerDetailsData.data[0]
    : {};
  const { attributes } = developerDetails;

  const jsonLd = attributes?.seo?.structuredData;

  return (
    <>
      <div className='md:px-20 px-0 pb-10'>
        <Script
          id={developerDetailsData?.data[0]?.id}
          type='application/ld+json'>
          {JSON.stringify(jsonLd)}
        </Script>
        <Suspense fallback={<HeadingSectionLoader />}>
          <HeadingSection params={params} />
        </Suspense>
        <div className='flex justify-center items-center md:hidden py-2'>
          <AdContainer
            slotId='div-gpt-ad-1727178570220-0'
            slotName='/22718860182/pg-mob-leaderboard'
            minWidth='300'
            minHeight='250'
          />
        </div>
        <div className='lg:flex w-full h-full gap-1'>
          <div className='lg:w-[75%] md:p-4 overflow-y-auto gap-5'>
            <Suspense fallback={<DeveloperDetailsLoader />}>
              <DeveloperDetails
                developerDetailsData={developerDetailsData}
                params={params}
              />
            </Suspense>
            <div className='flex lg:hidden md:hidden gap-5 flex-col px-5'>
              <PropertyDetailForm />
              <PropertyDetailFormButton />
            </div>

            <Suspense fallback={<DeveloperPropertiesLoader />}>
              <DeveloperProperties
                developerDetailsData={developerDetailsData}
                params={params}
              />
            </Suspense>
            <div className='flex flex-col items-center gap-5 justify-center lg:hidden md:hidden mt-5 py-4'>
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
          </div>
          <div className='lg:w-[30%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 h-full'>
            <div className='hidden lg:block'>
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
      <div className='bg-primary-featuredPropertiesBackgroundColor h-full w-full'>
        <div className='py-1'>
          <Suspense fallback={<TopDevelopersLoader />}>
            <TopDevelopers />
          </Suspense>
        </div>
      </div>
    </>
  );
}
