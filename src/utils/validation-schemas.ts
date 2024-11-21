import { string, object, bool, number } from 'yup';

export const emmarLeadFormSchema = object({
  name: string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  phone: string()
    .matches(/^[0-9]*$/, 'Phone number must be a number')
    .required('Phone number is required'),
  countryCode: string()
    .required('Country code is required')
    .max(10, 'Country code must be at most 10 characters'),
  numberOfBedrooms: string()
    .matches(/^[0-9]*$/, 'Bedroom must be a number')
    .required('Bedroom is required'),
  country: string()
    .required('Country is required')
    .max(50, 'Country must be at most 50 characters'),
  callRecordingUrl: string()
    .required('Call recording url is required')
    .max(100, 'Call recording url must be at most 100 characters'),
  language: string()
    .required('Language is required')
    .max(50, 'Language must be at most 50 characters'),
  comment: string()
    .required('Comment is required')
    .max(200, 'Comment must be at most 200 characters'),
});

export const contactUsFormSchema = object({
  name: string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  phone: string()
    .matches(/^[0-9]*$/, 'Phone number must be a number')
    .required('Phone number is required')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),
  message: string()
    .required('Message is required')
    .max(200, 'Message must be at most 200 characters'),
  canContact: bool().oneOf([true], 'You must accept to be contacted'),
});

export const contactUsPopupSchema = object({
  name: string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  phone: string()
    .matches(/^[0-9]*$/, 'Phone number must be a number')
    .required('Phone number is required')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),
  message: string()
    .required('Message is required')
    .max(200, 'Message must be at most 200 characters'),
});

export const brochureFormSchema = object({
  name: string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  phone: string()
    .matches(/^[0-9]*$/, 'Phone number must be a number')
    .required('Phone number is required')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),
});

export const enquiryFormSchema = object({
  name: string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  phone: string()
    .matches(/^[0-9]*$/, 'Phone number must be a number')
    .required('Phone number is required')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),
  canContact: bool().oneOf([true], 'You must accept to be contacted'),
});

export const mortgageSchema = object({
  downPaymentPercentage: number()
    .required('Down Payment Percentage is required')
    .min(0, 'Must be greater than or equal to 0'),
  term: number().required('Term is required').min(1, 'Must be at least 1 year'),
  interestRate: number()
    .required('Interest Rate is required')
    .min(0, 'Must be greater than or equal to 0'),
});
export const mortgagePageSchema = object({
  salePrice: number()
    .required('Sale Price Percentage is required')
    .min(0, 'Must be greater than or equal to 0'),
  downPaymentPercentage: number()
    .required('Down Payment Percentage is required')
    .min(0, 'Must be greater than or equal to 0'),
  term: number().required('Term is required').min(1, 'Must be at least 1 year'),
  interestRate: number()
    .required('Interest Rate is required')
    .min(0, 'Must be greater than or equal to 0'),
});
