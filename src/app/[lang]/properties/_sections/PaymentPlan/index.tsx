import { getPropertyDetails } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import PaymentPlanClient from './client';

type Slug = {
  slug: string;
};

export default async function PaymentPlan({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);

  if (propertyDetailsStatus === ResponseStatusEnum.SUCCESS) {
    return <PaymentPlanClient floorPlanDetails={propertyDetailsData} />;
  } else {
    return null;
  }
}
