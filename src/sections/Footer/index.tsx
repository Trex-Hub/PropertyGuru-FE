import React from 'react';
import {
  getCategoriesCount,
  getNewLaunchedProperties,
} from '@/services/properties';
import { ResponseStatusEnum } from '@/models/common';
import FooterClient from './client';

export default async function Footer({ lang }: { lang: string }) {
  // Fetch new launched properties
  const { data: newLaunchedPropertyData, status: newLaunchedStatus } =
    await getNewLaunchedProperties();

  if (
    newLaunchedStatus !== ResponseStatusEnum.SUCCESS ||
    newLaunchedPropertyData?.length === 0
  ) {
    return null;
  }

  // Fetch categories count
  const { data: categoriesCountData, status: categoriesCountStatus } =
    await getCategoriesCount();
  if (categoriesCountStatus !== ResponseStatusEnum.SUCCESS) {
    return null;
  }

  return (
    <FooterClient
      categoriesCount={categoriesCountData}
      latestProperties={newLaunchedPropertyData}
      lang={lang}
    />
  );
}
