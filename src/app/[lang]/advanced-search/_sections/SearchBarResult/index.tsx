import { getAllProperties } from '@/services/properties';
import SearchBarResultClient from './client';
import {
  INITIAL_PAGE,
  SEARCH_PROPERTIES_ITEMS_PER_PAGE,
  SORT_BY_OPTIONS,
} from '@/utils/constants';

type AllPropertiesParams = {
  searchParams: any;
  params: {
    lang: string;
    category: string;
  };
};

export default async function SearchBarResult({
  searchParams,
  params,
}: AllPropertiesParams) {
  const { data: allPropertiesData } = await getAllProperties(
    searchParams.minPrice,
    searchParams.maxPrice,
    searchParams.city,
    searchParams.area,
    searchParams.developer,
    searchParams.propertyType,
    searchParams.readiness,
    searchParams.minArea,
    searchParams.maxArea,
    searchParams.bedroom,
    searchParams.bathroom,
    searchParams.possession,
    searchParams.amenity,
    searchParams.keyword,
    params.category,
    Number(searchParams.page) || INITIAL_PAGE,
    SEARCH_PROPERTIES_ITEMS_PER_PAGE,
    searchParams.sort || SORT_BY_OPTIONS[0].value
  );
  return (
    <SearchBarResultClient
      searchParams={searchParams}
      allProperties={allPropertiesData}
      params={params}
    />
  );
}
