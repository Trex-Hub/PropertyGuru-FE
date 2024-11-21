import { endpoints } from '@/configs';
import { ResponseStatusEnum } from '@/models/common';
import { isProduction, SOMETHING_WENT_WRONG } from '@/utils/constants';
import { http } from '@/utils/http';
import logger from '@/utils/logger';
import { formatResponse } from '@/utils/utilities';

export async function getLoggedInUser(token?: string) {
  try {
    const url = endpoints.PROFILE_ENDPOINT;
    const res = await http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(!isProduction && { 'ngrok-skip-browser-warning': 'true' }),
      },
    });
    return formatResponse(res, ResponseStatusEnum.SUCCESS);
  } catch (err) {
    logger.error('Error in getLoggedInUser', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while fetching logged in user!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
}
