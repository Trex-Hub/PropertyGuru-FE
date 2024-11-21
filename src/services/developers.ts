'use server';
import { endpoints } from '@/configs';
import { ResponseStatusEnum } from '@/models/common';
import { INITIAL_PAGE, SOMETHING_WENT_WRONG } from '@/utils/constants';
import { http } from '@/utils/http';
import logger from '@/utils/logger';
import { formatResponse } from '@/utils/utilities';
import { cookies } from 'next/headers';

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
export const getAllDevelopers = async (
  page = INITIAL_PAGE,
  limit?: number,
  keyword?: string
) => {
  try {
    let url = `${endpoints.GET_ALL_DEVELOPERS}&pagination[start]=${(page - 1) * (limit ?? 0)}`;
    if (limit !== undefined && limit !== null) {
      url += `&pagination[limit]=${limit}`;
    }
    if (keyword) {
      url += `&filters[$and][10][title][$contains]=${keyword}`;
    }
    const response = await http.getCached(url);
    return formatResponse(response, ResponseStatusEnum.SUCCESS);
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

// service function to creater a developer subscription
export const createDeveloperSubscription = async (
  subscriberId: number,
  developerId: number,
  token: string
) => {
  try {
    const url = `${endpoints.SUBSCRIBE_DEVELOPER}`;
    return formatResponse(
      await http.post(
        url,
        {
          data: {
            user: subscriberId,
            developers: [developerId],
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in createDeveloperSubscription', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to subscribe to a developer
export const subscribeToDeveloper = async (
  subscriptionId: number,
  developerId: number,
  token: string
) => {
  try {
    const url = `${endpoints.SUBSCRIBE_DEVELOPER}/${subscriptionId}/subscribe`;
    return formatResponse(
      await http.patch(
        url,
        {
          developerId: developerId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in subscribeToDeveloper', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to unsubscribe from a developer
export const unsubscribeFromDeveloper = async (
  subscriptionId: number,
  developerId: number,
  token: string
) => {
  try {
    const url = `${endpoints.SUBSCRIBE_DEVELOPER}/${subscriptionId}/unsubscribe`;
    return formatResponse(
      await http.patch(
        url,
        {
          developerId: developerId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in unsubscribeFromDeveloper', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

//service function to get all subscribed developers IDs
export const getSubscribedDevelopersIds = async (
  subscriberId: number,
  token?: string
) => {
  const cookieStore = cookies();
  try {
    const url = `${endpoints.SUBSCRIBE_DEVELOPER}/${subscriberId}/developer-ids`;
    return formatResponse(
      await http.get(url, {
        headers: {
          Authorization: `Bearer ${cookieStore.get('token')?.value || token}`,
        },
      }),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getSubscribedDevelopers', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

//service function to get all subscribed developers
export const getSubscribedDevelopers = async (
  subscriptionId: number,
  token: string
) => {
  try {
    const url = `${endpoints.SUBSCRIBE_DEVELOPER}/${subscriptionId}?populate[developers][populate]=*`;
    return formatResponse(
      await http.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getSubscribedDevelopers', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

// service function to get all subscribed developers with pagination
export const getSubscribedDevelopersWithPagination = async (
  subscriptionId: number,
  token: string,
  start: number,
  limit: number
) => {
  try {
    const url = `${endpoints.SUBSCRIBE_DEVELOPER}/${subscriptionId}/developer-properties?start=${start}&limit=${limit}&populate=*`;
    return formatResponse(
      await http.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getSubscribedDevelopersWithPagination', err);
    return formatResponse(
      err instanceof Error ? err.message : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};
