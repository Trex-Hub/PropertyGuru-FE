import DeveloperDetailsClient from './client';

export default async function DeveloperDetails({
  developerDetailsData,
}: {
  developerDetailsData: any;
  params: {
    slug: string;
  };
}) {
  return <DeveloperDetailsClient developerDetails={developerDetailsData} />;
}
