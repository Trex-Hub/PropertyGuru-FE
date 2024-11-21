'use server';
import { endpoints } from '@/configs';
import { ResponseStatusEnum } from '@/models/common';
import {
  DEFAULT_SORT_OPTION,
  INITIAL_PAGE,
  NO_SELECTION,
  SOMETHING_WENT_WRONG,
  SORT_BY_OPTIONS,
} from '@/utils/constants';
import { http } from '@/utils/http';
import logger from '@/utils/logger';
import { formatResponse } from '@/utils/utilities';

// service function to get featured properties
export const getFeaturedProperties = async (
  propertyType?: string | null,
  start = 0,
  limit = 5
) => {
  try {
    const url = propertyType
      ? `${endpoints.GET_FEATURED_PROPERTIES}&filters[propertyType]=${propertyType}&pagination[start]=${start}&pagination[limit]=${limit}&sort=createdAt:desc`
      : `${endpoints.GET_FEATURED_PROPERTIES}&pagination[start]=${start}&pagination[limit]=${limit}&sort=createdAt:desc`;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getFeaturedProperties', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get new launched properties
export const getNewLaunchedProperties = async (
  propertyType?: string | null,
  start = 0,
  limit = 5
) => {
  try {
    const url = propertyType
      ? `${endpoints.GET_NEW_LAUNCHED_PROPERTIES}&filters[propertyType]=${propertyType}&pagination[start]=${start}&pagination[limit]=${limit}&sort=createdAt:desc`
      : `${endpoints.GET_NEW_LAUNCHED_PROPERTIES}&pagination[start]=${start}&pagination[limit]=${limit}&sort=createdAt:desc`;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getNewLaunchedProperties', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get categories properties
export const getCategoriesCount = async () => {
  try {
    const url = endpoints.GET_CATEGORIES_COUNT;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getCategoriesCount', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all property types
export const getAllPropertyTypes = async () => {
  try {
    const url = endpoints.GET_ALL_PROPERTY_TYPE;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getAllPropertyTypes', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all cities properties
export const getAllCities = async () => {
  try {
    const url = endpoints.GET_ALL_CITIES;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getAllCities', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all areas properties
export const getAllAreas = async () => {
  try {
    const url = endpoints.GET_ALL_AREAS;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getAllAreas', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all Cities Areas properties
export const getAllCitiesAreas = async () => {
  try {
    const url = endpoints.GET_ALL_CITIES_AREAS;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getAllCitiesAreas', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all properties
export const getAllProperties = async (
  minPrice?: number,
  maxPrice?: number,
  city?: string,
  area?: string,
  developer?: string,
  propertyType?: string,
  readiness?: string,
  minArea?: number,
  maxArea?: number,
  bedroom?: number | number[],
  bathroom?: number | number[],
  possession?: string | string[],
  amenity?: string | string[],
  keyword?: string,
  category?: string,
  page = INITIAL_PAGE,
  limit?: number,
  sortOption = DEFAULT_SORT_OPTION
) => {
  try {
    // Construct the base URL
    let url = `${endpoints.GET_ALL_PROPERTIES}&pagination[start]=${(page - 1) * (limit ?? 0)}`;
    if (limit !== undefined && limit !== null) {
      url += `&pagination[limit]=${limit}`;
    }
    // Construct the filter parameters only if they are present
    const filters = [];
    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.push(
        `filters[$and][0][price][$between][0]=${minPrice}&filters[$and][0][price][$between][1]=${maxPrice}`
      );
    }
    if (area || city) {
      const locationFilter = [];
      if (area && area !== NO_SELECTION) {
        locationFilter.push(
          `filters[$and][1][$and][0][location][area][$eq]=${area}`
        );
      }
      if (city && city !== NO_SELECTION) {
        locationFilter.push(
          `filters[$and][1][$and][1][location][city][$eq]=${city}`
        );
      }
      filters.push(locationFilter.join('&'));
    }
    if (category || (propertyType && propertyType !== NO_SELECTION)) {
      filters.push(
        `filters[$and][2][propertyType]=${category || propertyType}`
      );
    }
    if (developer && developer !== NO_SELECTION) {
      filters.push(`filters[$and][3][developer][title][$eq]=${developer}`);
    }
    if (readiness && readiness !== NO_SELECTION) {
      filters.push(`filters[$and][4][planType]=${readiness}`);
    }
    if (possession) {
      if (Array.isArray(possession)) {
        const possessionFilter = possession
          .map(
            (status, index) =>
              `filters[$and][5][$or][${index}][possessionStatus][$eq]=${status}`
          )
          .join('&');
        filters.push(possessionFilter);
      } else {
        filters.push(`filters[$and][5][possessionStatus][$eq]=${possession}`);
      }
    }
    if (bedroom) {
      if (Array.isArray(bedroom)) {
        const bedroomFilter = bedroom
          .map(
            (num, index) =>
              `filters[$and][6][$or][${index}][floorPlan][bedroom][$eq]=${num}`
          )
          .join('&');
        filters.push(bedroomFilter);
      } else {
        filters.push(`filters[$and][6][floorPlan][bedroom][$eq]=${bedroom}`);
      }
    }
    if (bathroom) {
      if (Array.isArray(bathroom)) {
        const bathroomFilter = bathroom
          .map(
            (num, index) =>
              `filters[$and][7][$or][${index}][floorPlan][bathroom][$eq]=${num}`
          )
          .join('&');
        filters.push(bathroomFilter);
      } else {
        filters.push(`filters[$and][7][floorPlan][bathroom][$eq]=${bathroom}`);
      }
    }
    if (minArea !== undefined && maxArea !== undefined) {
      filters.push(
        `filters[$and][8][propertyDetails][area_sqft][$between][0]=${minArea}&filters[$and][8][propertyDetails][area_sqft][$between][1]=${maxArea}`
      );
    }
    if (amenity) {
      if (Array.isArray(amenity)) {
        const amenityFilter = amenity
          .map(
            (feature, index) =>
              `filters[$and][9][$or][${index}][features][$contains]=${feature}`
          )
          .join('&');
        filters.push(amenityFilter);
      } else {
        filters.push(`filters[$and][9][features][$contains]=${amenity}`);
      }
    }
    if (keyword) {
      filters.push(`filters[$and][10][title][$contains]=${keyword}`);
    }

    // Add the constructed filters to the URL
    if (filters.length > 0) {
      url += `&${filters.join('&')}`;
    }

    // Add the sort parameter to the URL
    const sortParam = SORT_BY_OPTIONS.find(
      option => option.value === sortOption
    )?.sortParam;
    if (sortParam) {
      url += `&sort=${sortParam}`;
    }
    // Make the API call
    const response = await http.getCached(url);
    return formatResponse(response, ResponseStatusEnum.SUCCESS);
  } catch (err) {
    logger.error('Error in getAllProperties', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get property details by slug
export const getPropertyDetails = async (slug: string) => {
  try {
    const url = `${endpoints.GET_PROPERTY_DETAIL}&filters[slug][$eq]=${slug}`;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getPropertyDetails', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get similar properties
export const getSimilarProperties = async (
  city?: string | null,
  propertyType?: string | null,
  minPrice?: number | null,
  maxPrice?: number | null,
  slug?: string | null
) => {
  try {
    const url = `${endpoints.GET_SIMILAR_PROPERTIES}&filters[$and][1][$and][1][location][city][$eq]=${city}&filters[$and][2][propertyType]=${propertyType}&filters[$and][0][price][$between][0]=${minPrice}&filters[$and][0][price][$between][1]=${maxPrice}&filters[slug][$not][$eq]=${slug}`;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getSimilarProperties', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

export const getHomePageAds = async () => {
  try {
    const url = endpoints.GET_HOME_ADS;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getHomePageAds', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get developer properties
export const getDeveloperProperties = async (slug: string) => {
  try {
    const url = `${endpoints.GET_DEVELOPER_PROPERTIES}&filters[developer][slug][$eq]=${slug}`;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getDeveloperProperties', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all amenities
export const getAllAmenities = async () => {
  try {
    const url = endpoints.GET_ALL_AMENITIES;
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getAllAmenities', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};
