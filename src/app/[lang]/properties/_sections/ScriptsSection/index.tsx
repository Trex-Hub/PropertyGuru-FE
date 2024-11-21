import { getPropertyDetails } from '@/services/properties';
import Script from 'next/script';

export default async function ScriptsSection({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const { data: propertyDetailsData } = await getPropertyDetails(params.slug);
  const propertyDetails = propertyDetailsData?.data?.length
    ? propertyDetailsData.data[0]
    : {};
  const { attributes } = propertyDetails;

  const jsonLd = attributes?.seo?.structuredData;
  return (
    <Script id={propertyDetailsData?.data[0]?.id} type='application/ld+json'>
      {JSON.stringify(jsonLd)}
    </Script>
  );
}
