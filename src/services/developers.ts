'use server';
import { endpoints } from '@/configs';
import { ResponseStatusEnum } from '@/models/common';
import { INITIAL_PAGE, SOMETHING_WENT_WRONG } from '@/utils/constants';
import { http } from '@/utils/http';
import logger from '@/utils/logger';
import { formatResponse } from '@/utils/utilities';

// service function to get unique developers
export const getUniqueDevelopers = async () => {
  try {
    const url = endpoints.GET_UNIQUE_DEVELOPERS;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getUniqueDevelopers', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all developers
export const getAllDevelopers = async (page = INITIAL_PAGE, limit?: number) => {
  try {
    let url = `${endpoints.GET_ALL_DEVELOPERS}&pagination[start]=${(page - 1) * (limit ?? 0)}`;
    if (limit !== undefined && limit !== null) {
      url += `&pagination[limit]=${limit}`;
    }
    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getAllDevelopers', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get developer detail
export const getDeveloperDetails = async (slug: string) => {
  try {
    const url = `${endpoints.GET_DEVELOPER_DETAIL}&filters[slug][$eq]=${slug}`;

    return formatResponse(
      await http.getCached(url),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getDeveloperDetail', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};
