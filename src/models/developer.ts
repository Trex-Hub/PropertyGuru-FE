interface LogoAttributes {
  url: string;
  alternativeText: string;
}

interface LogoData {
  id: number;
  attributes: LogoAttributes;
}

interface Logo {
  data: LogoData;
}

export interface Developers {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    rank: number;
    logo: Logo;
    seoTracking: boolean;
    properties: {
      data: [object, length: number];
    };
  };
}

export interface DeveloperDetailsProps {
  developerDetails: {
    data: Developers[];
  };
}
