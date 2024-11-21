import { MenuItem } from '../models/common';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  { id: 2, name: 'Properties', href: '/property-list' },
  {
    id: 3,
    name: 'Developers',
    href: '/developers',
  },

  { id: 4, name: 'Mortgage Calculator', href: '/mortgage-calculator' },
  { id: 5, name: 'About us', href: '/about-us' },
  { id: 6, name: 'Contact', href: '/contact-us' },
];

export const OPTIONS = [
  { name: 'All', url: '' },
  { name: 'Apartment', url: 'Apartment' },
  { name: 'Villas', url: 'Villas' },
  { name: 'Townhouse', url: 'Townhouse' },
];

export const MIN_VALUE = 0;
export const MAX_VALUE = 25000000;

export const AreaSystem = {
  SQUARE_FEET: 'square feet',
  SQUARE_METRES: 'square metres',
};

export const DistanceSystem = {
  KILO_METERS: 'Kilo-meters, metres',
  MILES_FEET: 'Miles and feet',
};

export const PaymentFrequencyOptions = {
  MONTHLY: 'Monthly',
  QUATERLY: 'Quaterly',
  SEMI_ANNUALLY: 'Semi Annually',
};

export const Language = {
  English: 'English',
  Arabic: 'Arabic',
};

export const Currency = {
  AED: 'AED',
};

export const SOMETHING_WENT_WRONG =
  'Something went wrong! Please try again later.';

export const FEATURED_PROPERTIES_ITEMS_PER_PAGE = 6;

export const NEW_LAUNCH_PROPERTIES_ITEMS_PER_PAGE = 6;

export const INITIAL_PROPERTIES_ITEMS_PER_PAGE = 5;

export const SEARCH_PROPERTIES_ITEMS_PER_PAGE = 10;
export const DEVELOPERS_PER_PAGE = 10;

export const AREA_OPTIONS = [{ value: 1500 }, { value: 2000 }];

export const BEDROOM_OPTIONS = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
];

export const BATHROOM_OPTIONS = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
];

export const POSSESSION_OPTIONS = [
  { value: 'under-construction', label: 'Under Construction' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'pre-launch', label: 'Pre Launch' },
  { value: 'ready-to-move', label: 'Ready to move' },
  { value: 'newly-released', label: 'Newly Released' },
];

export const INITIAL_PAGE = 1;
export const SORT_BY_OPTIONS = [
  { value: 'Most Recent', sortParam: 'createdAt:desc' },
  { value: 'Price - Low to High', sortParam: 'price:asc' },
  { value: 'Price - High to Low', sortParam: 'price:desc' },
  {
    value: 'Area - Low to High',
    sortParam: 'propertyDetails.area_sqft:asc',
  },
  {
    value: 'Area - High to Low',
    sortParam: 'propertyDetails.area_sqft:desc',
  },
];
export const DEFAULT_SORT_OPTION = 'Most Recent';
export const PHONE_NUMBER = '97144941222';
export const WHATSAPP_NUMBER = '+971567578028';
export const INSTAGRAM_LINK = 'https://www.instagram.com/propertyguru.ae/';
export const LINKEDIN_LINK =
  'https://www.linkedin.com/company/propertyguru-ae/';
export const TWITTER_LINK = 'https://www.twitter.com/propertyguru';
export const FACEBOOK_LINK =
  'https://www.facebook.com/people/Propertyguruae/100083725153125/';
export const DEFAULT_MAP_LINK =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462561.6574537445!2d55.22748795!3d25.076022449999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1719148569410!5m2!1sen!2sin';
export const NO_SELECTION = 'No selection';
export const readinessOptions = {
  NO_SELECTED: NO_SELECTION,
  READY: 'Ready',
  OFF_PLAN: 'Off-Plan',
};

export const NEXT_PUBLIC_ASSETS_URL = process.env.NEXT_PUBLIC_ASSETS_URL ?? '';
export const BASE_FE_URL = process.env.BASE_FE_URL ?? 'http://localhost:3000/';
export const PROPERTY_LIST_LIMIT =
  process.env.NEXT_PUBLIC_PROPERTY_LIST_LIMIT || 10;
export const CONTACT_US_MAP_LINK =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.1195467550306!2d55.15361997516016!3d25.097814277775168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b177d1c4711%3A0x8ac2661e018f334!2sPropertyGuru%20UAE!5e0!3m2!1sen!2sae!4v1726650498366!5m2!1sen!2sae';
export const ADS_URL =
  process.env.NEXT_PUBLIC_ADS_URL ||
  'https://propertygurublob.blob.core.windows.net/image-storage/assets/IMG_0_caeff6647a.mp4';
export const TOP_DEVELOPERS_MAX_COUNT =
  process.env.NEXT_PUBLIC_TOP_DEVELOPERS_MAX_COUNT || 5;
export const SIMILAR_PROPERTIES_PRICE_RANGE = 200000;

export const ROUTE_OPTIONS = {
  HOME: '',
  PROPERTY_LIST: 'property-list',
  ADVANCED_SEARCH: 'advanced-search',
  DEVELOPERS: 'developers',
  ESTATE_DEVELOPER: 'estate_developer',
  MORTGAGE_CALCULATOR: 'mortgage-calculator',
  LISTINGS: 'listings',
};
export const insightsData = [
  {
    id: 1,
    title: 'Growth Rate',
    description:
      'Real estate growth rate reached 34% in the latest market analysis.',
  },
  {
    id: 2,
    title: 'Market trends',
    description:
      'Current market trends indicate a steady increase in residential property prices across key regions.',
  },
  {
    id: 3,
    title: 'Investment opportunities',
    description:
      "There are significant investment opportunities available in today's real estate market.",
  },
  {
    id: 4,
    title: 'Impact of interest rates',
    description:
      'Interest rates have a significant impact on real estate affordability and market activity.',
  },
];
