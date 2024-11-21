import { Property } from '@/models/property';
import { getAllProperties } from '@/services/properties';
import { BASE_FE_URL } from '@/utils/constants';
import { lang } from '@/utils/utilities';
import { MetadataRoute } from 'next';

const BASE_URL = BASE_FE_URL;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: allPropertiesData } = await getAllProperties();
  const properties = allPropertiesData?.data;

  if (properties && properties.length > 0) {
    return properties
      .filter((property: Property) => property?.attributes?.seoTracking)
      .map((property: Property) => ({
        url: `${BASE_URL}/${lang}/properties/${property?.attributes?.slug}/`,
        priority: 1,
        changeFrequency: 'daily',
        lastModified: property?.attributes?.updatedAt,
      }));
  }

  return [];
}
