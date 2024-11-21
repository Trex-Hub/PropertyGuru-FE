import { ResponseStatusEnum } from '@/models/common';
import { getDeveloperDetails } from '@/services/developers';
import DeveloperDetailsClient from './client';

export default async function DeveloperDetails({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { data: developerDetailsData, status: developerDetailsStatus } =
    await getDeveloperDetails(params.slug);

  return developerDetailsStatus === ResponseStatusEnum.SUCCESS ? (
    <DeveloperDetailsClient developerDetails={developerDetailsData} />
  ) : null;
}
