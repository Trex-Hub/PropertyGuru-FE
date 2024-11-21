import { getSubscribedDevelopersWithPagination } from '@/services/developers';
import DevelopersListClient from './client';
import { DEVELOPERS_PER_PAGE } from '@/utils/constants';
import { cookies } from 'next/headers';
import { ResponseStatusEnum } from '@/models/common';

export default async function DevelopersList({ searchParams, params }: any) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const subscriptionId = parseInt(searchParams.subscriptionId) || 0;
  const { data, status } = await getSubscribedDevelopersWithPagination(
    subscriptionId,
    token,
    (searchParams.page - 1 || 0) * DEVELOPERS_PER_PAGE,
    DEVELOPERS_PER_PAGE
  );

  if (status === ResponseStatusEnum.SUCCESS) {
    return (
      <DevelopersListClient
        allDevelopers={data}
        params={params}
        searchParams={searchParams}
      />
    );
  } else {
    return (
      <p className='text-2xl font-bold text-primary-primaryTextColor m-10'>
        Error fetching developers
      </p>
    );
  }
}
