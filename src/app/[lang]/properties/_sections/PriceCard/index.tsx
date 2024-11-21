import { getPropertyDetails } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import PriceCardClient from './client';

type Slug = {
  slug: string;
};

export default async function PriceCard({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);
  if (propertyDetailsStatus !== ResponseStatusEnum.SUCCESS) {
    return null;
  }
  return <PriceCardClient propertyDetails={propertyDetailsData} />;
}
