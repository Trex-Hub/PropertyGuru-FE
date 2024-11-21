'use client';
import { RxCross2 } from 'react-icons/rx';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCallback } from 'react';
import { formatPriceWithCommas } from '@/utils/utilities';

type FloorPlanModalProps = {
  floorPlan: any;
  handleFloorPlanSelect: (floorPlan: any) => void;
  handleModalToggle: () => void;
};

const FloorPlanModal: React.FC<FloorPlanModalProps> = ({
  floorPlan,
  handleFloorPlanSelect,
  handleModalToggle,
}) => {
  const closePopupOnOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === 'popup-overlay') {
        handleModalToggle();
      }
    },
    [handleModalToggle]
  );
  const handleClick = useCallback(
    (plan: any) => () => {
      handleFloorPlanSelect(plan);
    },
    [handleFloorPlanSelect]
  );

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closePopupOnOutsideClick(e);
      }
    },
    [closePopupOnOutsideClick]
  );
  return (
    <>
      {/* Desktop Modal */}
      <div
        id='popup-overlay'
        className='hidden md:flex md:fixed md:inset-0 md:items-end md:justify-start md:z-50 md:bg-black md:bg-opacity-50 overflow-y-auto'
        onClick={closePopupOnOutsideClick}
        role='button'
        tabIndex={0}
        onKeyDown={handleKeyDown}>
        <div className='bg-primary-iconBackgroundColor p-6 rounded-lg shadow-lg font-primary h-[25rem] w-[57.375rem] ml-20 mb-20  overflow-y-auto'>
          <div className='flex items-start justify-between'>
            <p className='text-sm mb-4'>Available Units</p>
            <RxCross2
              onClick={handleModalToggle}
              className='text-lg cursor-pointer'
            />
          </div>
          <div className='flex flex-col mt-7 gap-5'>
            <div className='flex pl-10'>
              <p className='text-sm text-primary-primaryTextColor w-1/5'>
                Type
              </p>
              <p className='text-sm text-primary-primaryTextColor w-1/5'>
                Bedroom
              </p>
              <p className='text-sm text-primary-primaryTextColor w-1/5'>
                Bathroom
              </p>
              <p className='text-sm text-primary-primaryTextColor w-1/5'>
                Area
              </p>
              <p className='text-sm text-primary-primaryTextColor w-1/5'>
                Price
              </p>
            </div>
            {floorPlan?.map((plan: any) => (
              <div
                key={plan.id}
                className='bg-primary-backgroundColor rounded-xl'
                onClick={handleClick(plan)}
                onKeyDown={handleClick(plan)}
                tabIndex={0}
                role='button'>
                <div className='flex items-start p-4'>
                  <RadioGroup defaultValue='comfortable' className='w-[22%]'>
                    <div className='flex items-center space-x-2 gap-2'>
                      <RadioGroupItem
                        value={plan.title}
                        id={`radio-${plan.id}`}
                        className='text-primary-secondaryTextColor'
                      />
                      <Label
                        htmlFor={`radio-${plan.id}`}
                        className='text-primary-primaryTextColor'>
                        {plan.title}
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className='text-sm text-primary-primaryTextColor w-1/5 pl-3'>
                    {plan.bedroom}
                  </p>
                  <p className='text-sm text-primary-primaryTextColor w-1/5 pl-3'>
                    {plan.bathroom ?? '0'}
                  </p>
                  <p className='text-sm text-primary-primaryTextColor w-1/5'>
                    {plan.area !== undefined && plan.area !== null
                      ? `${plan.area} ft2`
                      : 'N/A'}
                  </p>
                  <div className='flex flex-col'>
                    <div className='flex gap-1'>
                      <p className='text-base font-semibold text-primary-labelColor'>
                        {' '}
                        AED{' '}
                      </p>
                      <p className='text-base text-primary-primaryTextColor'>
                        {formatPriceWithCommas(plan.price)}
                      </p>
                    </div>
                    <p className='text-sm text-primary-labelColor'>
                      Only {plan.unitsAvailable} available
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      <div
        id='popup-overlay'
        className='flex md:hidden fixed inset-0 items-center justify-center z-50 bg-black bg-opacity-50'
        onClick={closePopupOnOutsideClick}
        role='button'
        tabIndex={0}
        onKeyDown={handleKeyDown}>
        <div className='bg-primary-iconBackgroundColor w-[24.375rem] rounded-lg shadow-lg font-primary  mx-4 p-6'>
          <div className='flex items-start justify-between'>
            <p className='text-sm mb-4'>Available Units</p>
            <RxCross2
              onClick={handleModalToggle}
              className='text-lg cursor-pointer'
            />
          </div>
          <div className='flex flex-col mt-7 gap-5'>
            {floorPlan?.map((plan: any) => (
              <div
                key={plan.id}
                className='bg-primary-backgroundColor rounded-xl'
                onClick={handleClick(plan)}
                onKeyDown={handleClick(plan)}
                tabIndex={0}
                role='button'>
                <div className='flex flex-row items-center justify-between  p-4'>
                  <div className='flex flex-col'>
                    <RadioGroup defaultValue='comfortable' className='w-full'>
                      <div className='flex items-center space-x-2 gap-2'>
                        <RadioGroupItem
                          value={plan.title}
                          id={`radio-${plan.id}`}
                          className='text-primary-secondaryTextColor'
                        />
                        <Label
                          htmlFor={`radio-${plan.id}`}
                          className='text-primary-primaryTextColor'>
                          {plan.title}
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className='text-sm text-primary-primaryTextColor w-full pl-8 mt-2'>
                      {plan.bedroom} Bedroom
                    </p>
                    <p className='text-sm text-primary-primaryTextColor w-full pl-8 mt-2'>
                      {plan.area !== undefined && plan.area !== null
                        ? `${plan.area} ft2`
                        : 'N/A'}
                    </p>
                  </div>
                  <div className='flex flex-col mt-5'>
                    <p className='text-sm text-primary-primaryTextColor w-full '>
                      {plan.bathroom} Bathroom
                    </p>
                    <div className='flex flex-col'>
                      <div className='flex gap-1'>
                        <p className='text-base font-semibold text-primary-labelColor'>
                          {' '}
                          AED{' '}
                        </p>
                        <p className='text-base text-primary-primaryTextColor'>
                          {formatPriceWithCommas(plan.price)}
                        </p>
                      </div>
                      <p className='text-sm text-primary-labelColor'>
                        Only {plan.unitsAvailable} available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloorPlanModal;
