export interface EnquiryData {
  propertyId?: number;
  name: string;
  email: string;
  phone?: string;
  canContact?: boolean;
  message?: string;
}
export interface EmaarLeadFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  numberOfBedrooms: string;
  country: string;
  callRecordingUrl: string;
  language: string;
  comment: string;
}
