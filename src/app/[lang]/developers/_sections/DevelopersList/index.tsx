import { getAllDevelopers } from '@/services/developers';
import DevelopersListClient from './client';
import { DEVELOPERS_PER_PAGE, INITIAL_PAGE } from '@/utils/constants';

export default async function DevelopersList({ searchParams, params }: any) {
  const { data: allDevelopersData } = await getAllDevelopers(
    Number(searchParams.page) || INITIAL_PAGE,
    DEVELOPERS_PER_PAGE
  );
  return (
    <DevelopersListClient
      allDevelopers={allDevelopersData}
      params={params}
      searchParams={searchParams}
    />
  );
}
