import { ResponseStatusEnum } from '@/models/common';
import { getItem } from './storageHelper';

// Utility function to format the response based on Success or Error status
export const formatResponse = (data: any, status: ResponseStatusEnum) => {
  switch (status) {
    case ResponseStatusEnum.SUCCESS:
      return {
        status,
        data,
      };
    case ResponseStatusEnum.ERROR:
      return {
        status,
        error: data,
      };
    default:
      return {
        status,
        error: 'Response Status not found!',
      };
  }
};

// Utility function to generate unique id
export const generateUniqueId = () => {
  return Math.random().toString(36).slice(2).substring(0, 11).toUpperCase();
};

// Utility function to generate random number of given length
export const generateRandomNumber = (length: number) => {
  return Math.random().toString().slice(2).substring(0, length);
};

// Utility function to get month and day from Date type
export const getTime = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
};

// Utility function to get ellipsis text
export const getShortText = (
  dataArray: (string | number | number[] | string[])[]
): string => {
  const joinedData = dataArray
    .map(item => {
      if (typeof item === 'string') {
        return item;
      }
      if (typeof item === 'number') {
        return String(item);
      }
      if (Array.isArray(item)) {
        if (typeof item[0] === 'number') {
          return (item as number[]).join(', ');
        }
        return (item as string[]).join(', ');
      }
      return '';
    })
    .join(' ');

  return joinedData?.length > 10 ? `${joinedData.slice(0, 8)}...` : joinedData;
};
export const ellipsisText = (data: string) => {
  return data?.length > 12 ? `${data.slice(0, 12)}...` : data;
};

export const getBackgroundColorClass = (status: string) => {
  switch (status) {
    case 'Under Construction':
      return 'bg-primary-underConstructionBackgroundColor';
    case 'Delivered':
      return 'bg-primary-deliveredBackgroundColor';
    case 'Pre Launch':
      return 'bg-primary-preLaunchBackgroundColor';
    case 'Ready to move':
      return 'bg-primary-readyToMoveBackgroundColor';
    default:
      return 'bg-primary-readyToMoveBackgroundColor';
  }
};

export const getWhatsAppLink = (mobile: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${mobile}?text=${encodedMessage}`;
};
export const selectedLanguage = getItem('selectedLanguage');
export const lang = selectedLanguage
  ? selectedLanguage === 'Arabic'
    ? 'ar'
    : 'en'
  : 'en';
export const formatPriceWithCommas = (price: any) => {
  // Ensure price is a number or can be converted to a number
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return '0';

  const formattedPrice = Number.isInteger(numPrice)
    ? numPrice.toString()
    : numPrice.toFixed(2);

  return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const convertDescriptionToHtml = (description: any) => {
  return description
    ?.map((paragraph: any) => {
      const children = paragraph.children
        .map((child: any) => child.text)
        .join('');
      return `<p>${children}</p>`;
    })
    .join('');
};
export function ellipsesText(text: any, maxLength = 10) {
  const formattedPrice = text?.toLocaleString('en-US');
  if (formattedPrice?.length > maxLength) {
    return `${formattedPrice?.slice(0, maxLength - 3)}...`;
  }
  return formattedPrice;
}
export function convertSquareFeetToSquareMeters(
  areaInSquareFeet: number
): string {
  const areaInSquareMeters = areaInSquareFeet * 0.092903;
  return areaInSquareMeters.toFixed(2);
}
export const isNumber = (value: any): value is number => {
  return !isNaN(value) && typeof value === 'number';
};
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function getSlugFromTitle(title: string): string {
  return title.toLowerCase().replace(/\s/g, '-');
}
