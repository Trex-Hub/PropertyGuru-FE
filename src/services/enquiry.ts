'use server';
import { endpoints } from '@/configs';
import { ResponseStatusEnum } from '@/models/common';
import { EmaarLeadFormData, EnquiryData } from '@/models/enquiry';
import { SOMETHING_WENT_WRONG } from '@/utils/constants';
import { http } from '@/utils/http';
import logger from '@/utils/logger';
import { formatResponse } from '@/utils/utilities';

// Service function to create an enquiry
export const createEnquiry = async (enquiryData: EnquiryData) => {
  try {
    const url = endpoints.CREATE_ENQUIRY;
    await http.post(url, {
      data: enquiryData,
    });
    return formatResponse(
      'Enquiry submitted successfully!',
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in createEnquiry', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while submitting enquiry!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

export const downloadBrochure = async (enquiryData: EnquiryData) => {
  try {
    const url = endpoints.DOWNLOAD_BROCHURE;
    await http.post(url, {
      data: enquiryData,
    });
    return formatResponse(
      'Enquiry submitted successfully!',
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in downloadBrochure', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while submitting enquiry!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};

export const createEmaarLeadForm = async (
  emaarLeadFormData: EmaarLeadFormData
) => {
  try {
    const url = endpoints.EMAAR_LEAD_FORM;
    await http.post(url, {
      data: emaarLeadFormData,
    });
    return formatResponse(
      'Emaar lead form submitted successfully!',
      ResponseStatusEnum.SUCCESS
    );
  } catch (err) {
    logger.error('Error in createEmaarLeadForm', err);
    return formatResponse(
      err instanceof Error
        ? 'Error while submitting Emaar lead form!'
        : SOMETHING_WENT_WRONG,
      ResponseStatusEnum.ERROR
    );
  }
};
