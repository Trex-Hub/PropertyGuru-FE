import {
  getPropertyDetails,
  getSimilarProperties,
} from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import SimilarListingsClient from './client';
import { SIMILAR_PROPERTIES_PRICE_RANGE } from '@/utils/constants';

type City = {
  params: {
    slug: string;
    lang: string;
  };
};

export default async function SimilarListings({ params }: City) {
  const { data: propertyDetailsData, status: propertyDetailsStatus } =
    await getPropertyDetails(params.slug);
  if (
    propertyDetailsStatus !== ResponseStatusEnum.SUCCESS ||
    !propertyDetailsData?.data?.length
  ) {
    return <div>Error fetching property details</div>;
  }
  const { location, propertyType, price, slug } =
    propertyDetailsData.data[0].attributes;
  const minPrice = parseFloat(price) - SIMILAR_PROPERTIES_PRICE_RANGE;
  const maxPrice = parseFloat(price) + SIMILAR_PROPERTIES_PRICE_RANGE;
  const { data: similarPropertiesData, status: similarPropertiesStatus } =
    await getSimilarProperties(
      location.city,
      propertyType,
      minPrice,
      maxPrice,
      slug
    );
  return similarPropertiesStatus === ResponseStatusEnum.SUCCESS ? (
    <SimilarListingsClient
      propertyDetails={propertyDetailsData}
      similarProperties={similarPropertiesData?.data}
      params={params}
    />
  ) : null;
}
