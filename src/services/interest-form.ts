import { endpoints } from '@/configs';
import { ResponseStatusEnum } from '@/models/common';
import { InterestFormData } from '@/models/interest-form';
import { SOMETHING_WENT_WRONG } from '@/utils/constants';
import { http } from '@/utils/http';
import logger from '@/utils/logger';
import { getItem } from '@/utils/storageHelper';
import { formatResponse } from '@/utils/utilities';

export const createInterestForm = async (
  interestFormData: InterestFormData,
  token: string
) => {
  try {
    const url = endpoints.INTEREST_FORM;
    await http.post(
      url,
      {
        data: interestFormData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return formatResponse(
      'Interest form submitted successfully!',
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in createInterestForm', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while submitting Interest form!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

export const getInterestFormForUser = async (username: string) => {
  try {
    const url = `${endpoints.INTEREST_FORM}?filters[username][$eq]=${username}`;
    return formatResponse(
      await http.getCached(url, {
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
        },
      }),
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in getInterestFormForUser', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while fetching Interest form!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

export const updateInterestForm = async (
  id: number,
  interestFormData: InterestFormData,
  token: string
) => {
  try {
    const url = `${endpoints.INTEREST_FORM}/${id}`;
    await http.put(
      url,
      {
        data: interestFormData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return formatResponse(
      'Interest form updated successfully!',
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in updateInterestForm', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while updating Interest form!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};
