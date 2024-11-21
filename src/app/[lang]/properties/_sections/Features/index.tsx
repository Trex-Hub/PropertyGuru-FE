import { getPropertyDetails } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import FeaturesClient from './client';

type Slug = {
  slug: string;
};

export default async function Features({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);
  return propertyDetailsStatus === ResponseStatusEnum.SUCCESS ? (
    <FeaturesClient propertyDetails={propertyDetailsData} />
  ) : null;
}
