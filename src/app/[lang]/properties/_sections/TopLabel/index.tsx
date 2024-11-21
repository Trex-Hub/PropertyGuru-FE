import { getPropertyDetails } from '@/services/properties';
import TopLabelClient from './client';
import { ResponseStatusEnum } from '@/models/common';

type Slug = {
  slug: string;
};

export default async function TopLabel({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);
  return propertyDetailsStatus === ResponseStatusEnum.SUCCESS ? (
    <TopLabelClient propertyDetails={propertyDetailsData} />
  ) : null;
}
