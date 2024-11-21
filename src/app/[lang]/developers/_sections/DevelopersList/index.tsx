import { getAllDevelopers } from '@/services/developers';
import DevelopersListClient from './client';
import { DEVELOPERS_PER_PAGE, INITIAL_PAGE } from '@/utils/constants';

export default async function DevelopersList({ searchParams, params }: any) {
  const page = Number(searchParams.page) || INITIAL_PAGE;
  const keyword = searchParams.keyword || '';

  const { data: allDevelopersData } = await getAllDevelopers(
    page,
    DEVELOPERS_PER_PAGE,
    keyword
  );

  return (
    <DevelopersListClient
      allDevelopers={allDevelopersData}
      params={params}
      searchParams={searchParams}
    />
  );
}
