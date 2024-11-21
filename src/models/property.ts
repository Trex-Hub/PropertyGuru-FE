import { Developers } from './developer';

export interface Location {
  id: number;
  area: string;
  city: string;
  country: string;
}

export interface PropertyDetail {
  id: number;
  bath: number;
  area_sqft: number;
  bed: number | null;
}

export interface PaymentPlan {
  id: number;
  downPaymentPercentage: number;
  dldFeePercentage: number;
  constructionPercentage: number;
  constructionInstallments: number;
  uponHandoverPercentage: number;
  postHandoverPercentage: number;
  postHandoverInstallments: number;
  isPostHandover: boolean;
}

interface FloorImageAttributes {
  url: string;
  alternativeText: string;
}

interface FloorImageData {
  id: number;
  attributes: FloorImageAttributes;
}

interface FloorImage {
  data: FloorImageData;
}

interface FloorBrochureAttributes {
  url: string;
}

interface FloorBrochureData {
  id: number;
  attributes: FloorBrochureAttributes;
}

interface FloorBrochure {
  data: FloorBrochureData;
}
export interface FloorPlan {
  id: number;
  bedroom: number;
  area: number;
  price: number;
  title: string;
  unitsAvailable: number;
  bathroom: number;
  floorDescription: string | null;
  floorImage: FloorImage;
  floorBrochure: FloorBrochure;
}

interface ImageAttributes {
  url: string;
  alternativeText: string;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}
interface FeaturedImageAttributes {
  url: string;
  alternativeText: string;
}

interface FeaturedImageData {
  id: number;
  attributes: FeaturedImageAttributes;
}

interface FeaturedImage {
  data: FeaturedImageData;
}

interface Image {
  data: ImageData[];
}
interface DeveloperData {
  data: Developers;
}

export interface PropertyAttributes {
  title: string;
  price: string;
  isFeatured: boolean;
  propertyType: string;
  planType: string;
  description: string;
  maplink: string;
  handover: string;
  image: Image;
  featuredImage: FeaturedImage;
  unitsAvailable: number;
  slug: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
  possessionStatus: string;
  publishedAt: string;
  rank: number | null;
  location: Location;
  propertyDetails: PropertyDetail;
  floorPlan: FloorPlan[];
  developer: DeveloperData;
  paymentPlan: PaymentPlan;
  seoTracking: boolean;
}

export interface Property {
  id: number;
  attributes: PropertyAttributes;
}

export interface PropertyData {
  data: Property[];
}

export type SortOption = {
  value: string;
  sortParam: string;
};
