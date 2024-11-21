import { getDeveloperProperties } from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import { getDeveloperDetails } from '@/services/developers';
import DeveloperPropertiesClient from './client';

type Slug = {
  params: {
    slug: string;
    lang: string;
  };
};

export default async function DeveloperProperties({ params }: Slug) {
  const { data: developerDetailsData, status: developerDetailsStatus } =
    await getDeveloperDetails(params.slug);
  if (
    developerDetailsStatus !== ResponseStatusEnum.SUCCESS ||
    !developerDetailsData?.data?.length
  ) {
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
