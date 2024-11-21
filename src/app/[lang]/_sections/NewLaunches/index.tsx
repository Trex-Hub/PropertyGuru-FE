import { getNewLaunchedProperties } from '@/services/properties';
import { INITIAL_PROPERTIES_ITEMS_PER_PAGE } from '@/utils/constants';
import NewLaunchesClient from './client';
import { ResponseStatusEnum } from '@/models/common';

type NewLaunchPropertiesParams = {
  searchParams: {
    featuredPropertyType: string;
    launchedPropertyType: string;
  };

  params: {
    lang: string;
  };
};

export default async function NewLaunches({
  searchParams,
  ...rest
}: NewLaunchPropertiesParams) {
  const { data: newLaunchPropertiesData, status: newLaunchPropertiesStatus } =
    await getNewLaunchedProperties(
      searchParams.launchedPropertyType,
      0,
      INITIAL_PROPERTIES_ITEMS_PER_PAGE
    );
  return (
    <div>
      {newLaunchPropertiesStatus === ResponseStatusEnum.SUCCESS ? (
        <NewLaunchesClient
          {...{ ...rest }}
          searchParams={searchParams}
          newLaunchProperties={newLaunchPropertiesData.data}
        />
      ) : null}
    </div>
  );
}
