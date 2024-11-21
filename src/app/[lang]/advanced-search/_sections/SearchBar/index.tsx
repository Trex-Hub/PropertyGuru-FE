import {
  getAllAreas,
  getAllCities,
  getAllCitiesAreas,
  getAllPropertyTypes,
} from '@/services/properties';
import SearchBarClient from './client';
import { getUniqueDevelopers } from '@/services/developers';

export default async function SearchBar({ searchParams, params }: any) {
  const [
    { data: propertyTypeList },
    { data: citiesList },
    { data: areasList },
    { data: citiesAreasList },
    { data: developersList },
  ] = await Promise.all([
    getAllPropertyTypes(),
    getAllCities(),
    getAllAreas(),
    getAllCitiesAreas(),
    getUniqueDevelopers(),
  ]);
  return (
    <SearchBarClient
      searchParams={searchParams}
      propertyTypeList={propertyTypeList}
      citiesList={citiesList}
      areasList={areasList}
      citiesAreasList={citiesAreasList}
      developersList={developersList}
      params={params}
    />
  );
}
