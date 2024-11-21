import { ResponseStatusEnum } from '@/models/common';
import { getAllDevelopers } from '@/services/developers';
import TopDevelopersClient from './client';

export default async function TopDevelopers() {
  const { data: developersData, status: developersStatus } =
    await getAllDevelopers();
  if (developersStatus !== ResponseStatusEnum.SUCCESS) {
    return null;
  }
  return <TopDevelopersClient developersData={developersData} />;
}
