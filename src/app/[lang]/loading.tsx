import {
  DescriptionLoader,
  HeadingSectionLoader,
  PriceCardLoader,
  PropertyImagesLoader,
  TopLabelLoader,
} from './properties/[slug]/_components/Loaders';

export default function Loading() {
  return (
    <div>
      <HeadingSectionLoader />
      <TopLabelLoader />
      <PropertyImagesLoader />
      <PriceCardLoader />
      <DescriptionLoader />
    </div>
  );
}
