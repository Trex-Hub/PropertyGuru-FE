import { ResponseStatusEnum } from '@/models/common';
import { getPropertyDetails } from '@/services/properties';
import { NEXT_PUBLIC_ASSETS_URL } from '@/utils/constants';
import logger from '@/utils/logger';
import { ellipsesText } from '@/utils/utilities';
import { Metadata } from 'next';

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
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(params.slug);
  const attributes = propertyDetailsData?.data[0]?.attributes;

  if (propertyDetailsStatus === ResponseStatusEnum.SUCCESS) {
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
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${attributes?.ogImageLinkedIn?.data?.attributes?.url}`,
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
          canonical: `/${params?.lang}/properties/${attributes?.slug}`,
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
      canonical: `/${params?.lang}/properties/${attributes?.slug}`,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
