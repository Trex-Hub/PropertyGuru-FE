import { Developers } from '@/models/developer';
import { getAllDevelopers } from '@/services/developers';
import { BASE_FE_URL } from '@/utils/constants';
import { lang } from '@/utils/utilities';
import { MetadataRoute } from 'next';

const BASE_URL = BASE_FE_URL;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: AllDevelopersData } = await getAllDevelopers();
  const developers = AllDevelopersData?.data;

  if (developers && developers.length > 0) {
    return developers
      .filter((developer: Developers) => developer?.attributes?.seoTracking)
      .map((developer: Developers) => ({
        url: `${BASE_URL}/${lang}/estate_developer/${developer?.attributes?.slug}/`,
        priority: 1,
        changeFrequency: 'daily',
        lastModified: developer?.attributes?.updatedAt,
      }));
  }

  return [];
}
