import { string, object, bool, number } from 'yup';

const passwordRules = string()
  .required('Please enter your password')
  .max(20, 'Paword must be at most 20 characters')
  .matches(
    //eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  );

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

export const interestFormSchema = object({
  city: string().max(50, 'City must be at most 50 characters'),
  location: string().max(50, 'Location must be at most 50 characters'),
  minPrice: number(),
  maxPrice: number(),
  developer: string().max(50, 'Developer must be at most 50 characters'),
  propertyType: string().max(50, 'PropertyType must be at most 50 characters'),
  readiness: string().max(50, 'Readiness must be at most 50 characters'),
  bedroom: number()
    .typeError('Bedroom must be a number')
    .min(1, 'Bedroom must be at least 1')
    .max(25, 'Bedroom must be at most 25'),
  amenities: string().max(50, 'Amenities must be at most 50 characters'),
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

export const signUpFormSchema = object({
  username: string()
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .min(6, 'Username must be at least 6 characters')
    .max(50, 'Username must be at most 50 characters'),
  email: string()
    .email('Invalid email address')
    .required('Email is required')
    .max(50, 'Email must be at most 50 characters'),
  mobile: string()
    .matches(/^[0-9]*$/, 'Phone number must be a number')
    .min(10, 'Phone number must be exactly 10 digits')
    .max(10, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: passwordRules,
  confirmPassword: string()
    .required('Confirm Password is a required field')
    .test('password-match', 'Confirm Password must match', function (value) {
      return this.parent.password === value;
    }),
});

export const signInFormSchema = object({
  email: string().email('Invalid email address').required('Email is required'),
  password: string().required('Please Enter your password'),
});

export const forgotPasswordFormSchema = object({
  email: string()
    .email('Invalid email address')
    .max(50, 'Email must be at most 50 characters'),
});

export const ResetFormSchema = object({
  newPassword: passwordRules.required('Please enter your new password.'),
  confirmPassword: string()
    .required('Please confirm your new password.')
    .test('password-match', 'Passwords must match', function (value) {
      return this.parent.newPassword === value;
    }),
  code: string(),
});

export const missingDetailsValidationSchema = object({
  mobileNumber: string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});
