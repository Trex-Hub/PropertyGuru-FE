import { getDeveloperProperties } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import DeveloperPropertiesClient from './client';

type P = {
  developerDetailsData: any;
  params: {
    slug: string;
    lang: string;
  };
};

export default async function DeveloperProperties({
  params,
  developerDetailsData,
}: P) {
  if (!developerDetailsData) {
    return <div>Error fetching property details</div>;
  }
  const { slug } = developerDetailsData.data[0].attributes;
  const { data: developerPropertiesData, status: developerPropertiesStatus } =
    await getDeveloperProperties(slug);
  return developerPropertiesStatus === ResponseStatusEnum.SUCCESS ? (
    <DeveloperPropertiesClient
      developerDetails={developerDetailsData}
      developerProperties={developerPropertiesData?.data}
      params={params}
    />
  ) : null;
}
