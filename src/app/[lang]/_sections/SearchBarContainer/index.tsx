import { getUniqueDevelopers } from '@/services/developers';
import {
  getAllAreas,
  getAllCities,
  getAllCitiesAreas,
  getAllPropertyTypes,
} from '@/services/properties';
import SearchBarContainerClient from './client';

type SearchBarContainerProps = {
  params: {
    lang: string;
  };
};

export default async function SearchBarContainer({
  params,
}: SearchBarContainerProps) {
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
    <SearchBarContainerClient
      propertyTypeList={propertyTypeList}
      citiesList={citiesList}
      areasList={areasList}
      citiesAreasList={citiesAreasList}
      developersList={developersList}
      params={params}
    />
  );
}
