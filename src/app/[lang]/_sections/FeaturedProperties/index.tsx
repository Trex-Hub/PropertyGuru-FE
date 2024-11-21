import { getFeaturedProperties } from '@/services/properties';
import { INITIAL_PROPERTIES_ITEMS_PER_PAGE } from '@/utils/constants';
import FeaturedPropertiesClient from './client';
import { ResponseStatusEnum } from '@/models/common';
type FeaturedPropertiesParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };
  params: {
    lang: string;
  };
};

export default async function FeaturedProperties({
  searchParams,
  ...rest
}: FeaturedPropertiesParams) {
  const { data: featuredPropertiesData, status: featuredPropertiesStatus } =
    await getFeaturedProperties(
      searchParams.featuredPropertyType,
      0,
      INITIAL_PROPERTIES_ITEMS_PER_PAGE
    );
  return (
    <div>
      {featuredPropertiesStatus === ResponseStatusEnum.SUCCESS ? (
        <FeaturedPropertiesClient
          {...{ ...rest }}
          searchParams={searchParams}
          featuredProperties={featuredPropertiesData.data}
        />
      ) : null}
    </div>
  );
}
