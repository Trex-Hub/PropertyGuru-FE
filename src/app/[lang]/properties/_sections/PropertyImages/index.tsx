import { getPropertyDetails } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import PropertyImagesClient from './client';

type Slug = {
  slug: string;
};

export default async function PropertyImages({ slug }: Slug) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(slug);

  if (propertyDetailsStatus === ResponseStatusEnum.SUCCESS) {
    return <PropertyImagesClient propertyDetails={propertyDetailsData} />;
  } else {
    return null;
  }
}
