import { getPropertyDetails } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import DescriptionClient from './client';

type Slug = {
  slug: string;
};

export default async function Description({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);
  return propertyDetailsStatus === ResponseStatusEnum.SUCCESS ? (
    <DescriptionClient propertyDetails={propertyDetailsData} />
  ) : null;
}
