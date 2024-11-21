import { Suspense } from 'react';
import PropertyImages from '../_sections/PropertyImages';
import PriceCard from '../_sections/PriceCard';
import Description from '../_sections/Description';
import Features from '../_sections/Features';
import FloorPlans from '../_sections/FloorPlans';
import PaymentPlan from '../_sections/PaymentPlan';
import SimilarListings from '../_sections/SimilarListings';
import TopLabel from '../_sections/TopLabel';
import {
  DescriptionLoader,
  FeaturesLoader,
  FloorPlansLoader,
  HeadingSectionLoader,
  PaymentPlanLoader,
  PriceCardLoader,
  PropertyImagesLoader,
  SimilarListingsLoader,
  TopLabelLoader,
} from './_components/Loaders';
import HeadingSection from '../_sections/HeadingSection';
import PropertyDetailForm from '@/components/PropertyDetailForm';
import {
  FeaturedPropertiesLoader,
  GoogleAdVideoLoader,
} from '@/components/Loading';
import AdContainer from '@/components/AdContainer';
import PropertyDetailFormButton from '@/components/PropertyDetailFormButton';
import GoogleAdVideo from '@/components/GoogleAdVideo';
import SectionFeaturedProperties from '@/components/SideBar/SectionFeaturedProperties';
import ScriptsSection from '../_sections/ScriptsSection';
import InsightsCarousel from '@/components/InsightsCarousel';

export default async function PropertyDetailsPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  return (
    <>
      <div className='md:px-20 px-0'>
        <Suspense>
          <ScriptsSection params={params} />
        </Suspense>
        <Suspense fallback={<HeadingSectionLoader />}>
          <HeadingSection params={params} />
        </Suspense>
        <div className='flex justify-center items-center md:hidden py-2'>
          <AdContainer
            slotId='div-gpt-ad-1727178570220-0'
            slotName='/22718860182/pg-mob-leaderboard'
            minWidth='300'
            minHeight='250'
          />
        </div>
        <Suspense fallback={<TopLabelLoader />}>
          <TopLabel slug={params.slug} />
        </Suspense>
        <Suspense fallback={<PropertyImagesLoader />}>
          <PropertyImages slug={params.slug} />
        </Suspense>
        <div className='lg:flex w-full h-full gap-1'>
          <div className='lg:w-[75%] md:p-4 overflow-y-auto'>
            <Suspense fallback={<PriceCardLoader />}>
              <PriceCard slug={params.slug} />
            </Suspense>
            <Suspense fallback={<DescriptionLoader />}>
              <Description slug={params.slug} />
            </Suspense>
            <Suspense fallback={<FeaturesLoader />}>
              <Features slug={params.slug} />
            </Suspense>
            <div className='flex justify-center items-center md:hidden lg:hidden'></div>
            <Suspense fallback={<PaymentPlanLoader />}>
              <PaymentPlan slug={params.slug} />
            </Suspense>
            <Suspense fallback={<FloorPlansLoader />}>
              <FloorPlans slug={params.slug} />
            </Suspense>
          </div>
          <div className='lg:w-[30%] flex flex-col gap-5 lg:top-0 h-full'>
            <div className=''>
              <div className='hidden lg:block lg:mb-5'>
                <div className='gap-5 flex flex-col'>
                  <div className='pt-6 flex shadow-lg py-4 items-center justify-center flex-col gap-4'>
                    <AdContainer
                      slotId='div-gpt-ad-1722317306670-0'
                      slotName='/22718860182/pg-widget-right2'
                      minWidth='300'
                      minHeight='250'
                    />
                    <InsightsCarousel />
                  </div>

                  <PropertyDetailForm />
                  <PropertyDetailFormButton />
                </div>
                <Suspense fallback={<GoogleAdVideoLoader />}>
                  <GoogleAdVideo />
                </Suspense>
              </div>
              <Suspense fallback={<FeaturedPropertiesLoader />}>
                <SectionFeaturedProperties />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Suspense fallback={<SimilarListingsLoader />}>
          <SimilarListings params={params} />
        </Suspense>
        <div className='flex items-center justify-center md:hidden lg:hidden'>
          <Suspense fallback={<GoogleAdVideoLoader />}>
            <GoogleAdVideo />
          </Suspense>
        </div>
      </div>
    </>
  );
}
