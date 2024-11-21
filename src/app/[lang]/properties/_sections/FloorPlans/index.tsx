import { getPropertyDetails } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import FloorPlansClient from './client';

type Slug = {
  slug: string;
};

export default async function FloorPlans({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);
  return propertyDetailsStatus === ResponseStatusEnum.SUCCESS ? (
    <FloorPlansClient floorPlanDetails={propertyDetailsData} />
  ) : null;
}
