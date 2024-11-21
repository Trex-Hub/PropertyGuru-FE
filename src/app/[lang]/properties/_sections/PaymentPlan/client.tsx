'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PieChart } from 'react-minimal-pie-chart';
import { cn } from '@/lib/utils';
import { IoIosArrowDown } from 'react-icons/io';
import { PropertyData } from '@/models/property';
import { Input } from '@/components/ui/input';
import FloorPlanModal from '@/components/FloorPlanModal';
import { useFormik } from 'formik';
import { mortgageSchema } from '@/utils/validation-schemas';
import { ellipsesText, formatPriceWithCommas } from '@/utils/utilities';
import useScrollLock from '@/hooks/useScrollLock';

const PaymentPlanClient = ({
  floorPlanDetails,
}: {
  floorPlanDetails: PropertyData | undefined;
}) => {
  const [calculatorType, setCalculatorType] = useState<'payment' | 'mortgage'>(
    'payment'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(
    floorPlanDetails?.data[0]?.attributes.floorPlan[0] || null
  );
  const [downPaymentValue, setDownPaymentValue] = useState<number>(0);
  const [dldFeePaymentValue, setDldFeePaymentValue] = useState<number>(0);
  const [constructionAmount, setConstructionAmount] = useState<number>(0);
  const [uponHandoverAmount, setUponHandoverAmount] = useState<number>(0);
  const [postHandoverAmount, setPostHandoverAmount] = useState<number>(0);
  const [constructionInstallmentAmount, setConstructionInstallmentAmount] =
    useState<number>(0);
  const [postHandoverInstallmentAmount, setPostHandoverInstallmentAmount] =
    useState<number>(0);
  const attributes = floorPlanDetails?.data[0]?.attributes;
  const paymentPlan = floorPlanDetails?.data[0]?.attributes?.paymentPlan;

  const handleCalculatorType = useCallback(
    (type: 'payment' | 'mortgage') => () => {
      setCalculatorType(type);
    },
    []
  );
  const handleModalToggle = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, []);
  useScrollLock(isModalOpen);
  const handleFloorPlanSelect = (floorPlan: any) => {
    setSelectedFloorPlan(floorPlan);
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      downPaymentPercentage: '20',
      term: '',
      interestRate: '',
      downPayment: 0,
      monthlyPayment: 0,
      principal: 0,
      annualCost: 0,
      totalInterestPaid: 0,
      otherExpenses: 0,
      totalCost: 0,
    },
    validationSchema: mortgageSchema,
    onSubmit: values => {
      const homePrice = selectedFloorPlan ? selectedFloorPlan.price : 0;
      const downPayment =
        (homePrice * parseFloat(values.downPaymentPercentage)) / 100;
      const loanAmount = homePrice - downPayment;
      const monthlyInterestRate = parseFloat(values.interestRate) / 100 / 12;
      const numberOfPayments = parseInt(values.term) * 12;

      const monthlyPayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      const annualCost = monthlyPayment * 12;
      const totalInterestPaid = monthlyPayment * numberOfPayments - loanAmount;
      const otherExpenses = 0;
      const totalCost =
        downPayment + totalInterestPaid + loanAmount + otherExpenses;

      formik.setFieldValue('downPayment', downPayment);
      formik.setFieldValue('principal', loanAmount);
      formik.setFieldValue('monthlyPayment', monthlyPayment);
      formik.setFieldValue('annualCost', annualCost);
      formik.setFieldValue('totalInterestPaid', totalInterestPaid);
      formik.setFieldValue('otherExpenses', otherExpenses);
      formik.setFieldValue('totalCost', totalCost);
    },
  });

  useEffect(() => {
    if (selectedFloorPlan) {
      const homePrice = selectedFloorPlan.price;
      const calculatedDownPayment =
        (homePrice * parseFloat(formik.values.downPaymentPercentage)) / 100;
      const downPaymentPercentage = paymentPlan?.downPaymentPercentage ?? 0;
      const paymentPlanDownPaymentValue =
        (homePrice * downPaymentPercentage) / 100;
      setDownPaymentValue(paymentPlanDownPaymentValue);
      const dldFeePercentage = paymentPlan?.dldFeePercentage ?? 0;
      const dldFeeValue = (homePrice * dldFeePercentage) / 100;
      setDldFeePaymentValue(dldFeeValue);
      const constructionPercentage = paymentPlan?.constructionPercentage ?? 0;
      const constructionValue = (homePrice * constructionPercentage) / 100;
      setConstructionAmount(constructionValue);
      const constructionInstallments =
        paymentPlan?.constructionInstallments ?? 0;
      const constructionInstallmentValue =
        constructionValue / constructionInstallments;
      setConstructionInstallmentAmount(constructionInstallmentValue);
      const uponHandoverPercentage = paymentPlan?.uponHandoverPercentage ?? 0;
      const uponHandoverValue = (homePrice * uponHandoverPercentage) / 100;
      setUponHandoverAmount(uponHandoverValue);
      const postHandoverPercentage = paymentPlan?.postHandoverPercentage ?? 0;
      const postHandoverValue = (homePrice * postHandoverPercentage) / 100;
      setPostHandoverAmount(postHandoverValue);
      const postHandoverInstallments =
        paymentPlan?.postHandoverInstallments ?? 0;
      let postHandoverInstallmentValue = 0;
      if (postHandoverInstallments > 0) {
        postHandoverInstallmentValue =
          postHandoverValue / postHandoverInstallments;
      }
      setPostHandoverInstallmentAmount(postHandoverInstallmentValue);
      formik.setFieldValue('downPayment', calculatedDownPayment || 0);
    }
  }, [formik.values.downPaymentPercentage, selectedFloorPlan]);

  return (
    <>
      <div
        className='bg-primary-paymentplancbg font-primary p-6 pt-7 mt-4 flex flex-col gap-3'
        id='payment-plan'>
        <div className='flex gap-2 font-bold'>
          <Button
            className={cn(
              'p-2 text-[1rem] leading-[1.5rem] hover:bg-primary-dbpaymentbuttonbgcolor hover:text-black ',
              calculatorType === 'payment'
                ? 'bg-primary-dbpaymentbuttonbgcolor text-black'
                : 'bg-primary-backgroundColor text-primary-secondaryTextColor'
            )}
            onClick={handleCalculatorType('payment')}>
            Payment Plan
          </Button>
          <Button
            className={cn(
              'p-2 text-[1rem] leading-[1.5rem] hover:bg-primary-dbpaymentbuttonbgcolor hover:text-black',
              calculatorType === 'mortgage'
                ? 'bg-primary-dbpaymentbuttonbgcolor text-black'
                : 'bg-primary-backgroundColor text-primary-secondaryTextColor'
            )}
            onClick={handleCalculatorType('mortgage')}>
            Mortgage Calculator
          </Button>
        </div>

        {calculatorType === 'payment' && (
          <div className='flex flex-col gap-3 font-primary my-5'>
            <div className='flex justify-between items-center'>
              <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
                Payment Plan
              </p>
            </div>
            <div className='md:flex flex flex-col md:flex-row gap-2 border-b-2 border-b-black py-5 items-top'>
              <div className='md:w-1/2 flex flex-col gap-2'>
                <p className='text-sm text-primary-textColor'>Select Unit</p>
                <button
                  className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'
                  onClick={handleModalToggle}>
                  {selectedFloorPlan
                    ? `${selectedFloorPlan.bedroom} Bed, ${selectedFloorPlan.bathroom} Bath, ${selectedFloorPlan.area} ft²`
                    : 'Select Unit'}
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </div>
              <div className='md:w-1/2 md:pl-5 flex flex-col gap-2'>
                <p className='text-sm font-medium'>Home Price</p>
                <div className='flex gap-2 items-center py-2'>
                  <p className='text-sm text-primary-radioButtonTextColor'>
                    AED
                  </p>
                  <p className='text-xl font-bold text-primary-radioButtonTextColor'>
                    {selectedFloorPlan
                      ? formatPriceWithCommas(selectedFloorPlan.price)
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className='lg:flex lg:flex-nowrap gap-5 md:flex md:flex-wrap'>
              <div className='md:w-1/2 flex flex-col gap-5 mt-5'>
                <p className='text-base font-bold text-primary-textColor'>
                  Initial Payment
                </p>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-primary-textColor'>
                    Down Payment
                  </p>
                  <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-semibold'>AED</p>
                      <p>{formatPriceWithCommas(downPaymentValue)}</p>
                    </div>
                    <div className='flex items-center'>
                      <div className='text-primary-dropdownIconColor mr-1'>
                        |{' '}
                      </div>
                      <p>{paymentPlan?.downPaymentPercentage}</p>
                      <p className='text-primary-dropdownIconColor'>%</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col md:gap-0 gap-5  items-start md:flex-row w-full justify-between md:items-center'>
                  <div className='flex flex-col gap-1 font-primary'>
                    <p className='text-sm font-medium text-primary-textColor'>
                      DLD Fee (in percentage)
                    </p>
                    <div className='appearance-none bg-primary-backgroundColor text-sm  rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                      <p className='text-sm font-medium text-primary-textColor'>
                        {paymentPlan?.dldFeePercentage}
                      </p>
                      <p className='text-sm font-medium text-primary-dropdownIconColor'>
                        %
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-2 md:mt-8 mt-0 mr-1 font-primary'>
                    <p className='text-sm font-semibold text-primary-radioButtonTextColor'>
                      AED
                    </p>
                    <p className='text-sm font-medium text-primary-textColor'>
                      {formatPriceWithCommas(dldFeePaymentValue)}
                    </p>
                  </div>
                </div>
                <p className='text-base font-bold text-primary-textColor'>
                  During Construction
                </p>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-primary-textColor'>
                    Total Amount
                  </p>
                  <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-semibold'>AED</p>
                      <p>{formatPriceWithCommas(constructionAmount)}</p>
                    </div>
                    <div className='flex items-center'>
                      <div className='text-primary-dropdownIconColor mr-1'>
                        |{' '}
                      </div>
                      <p>{paymentPlan?.constructionPercentage}</p>
                      <p className='text-primary-dropdownIconColor'>%</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-primary-textColor'>
                    No. of Installments
                  </p>
                  <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                    <div className='flex items-center gap-2'>
                      <p>{paymentPlan?.constructionInstallments}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-primary-textColor'>
                    Installment Amount
                  </p>
                  <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-semibold'>AED</p>
                      <p>
                        {formatPriceWithCommas(constructionInstallmentAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='md:w-1/2 flex flex-col gap-5 mt-5'>
                <p className='text-base font-bold text-primary-textColor'>
                  Upon Handover
                </p>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-primary-textColor'>
                    Amount
                  </p>
                  <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-semibold'>AED</p>
                      <p>{formatPriceWithCommas(uponHandoverAmount)}</p>
                    </div>
                    <div className='flex items-center'>
                      <div className='text-primary-dropdownIconColor mr-1'>
                        |{' '}
                      </div>
                      <p>{paymentPlan?.uponHandoverPercentage}</p>
                      <p className='text-primary-dropdownIconColor'>%</p>
                    </div>
                  </div>
                </div>
                {paymentPlan?.isPostHandover === true && (
                  <div className='flex flex-col gap-5'>
                    <p className='text-base font-bold text-primary-textColor'>
                      Post Handover
                    </p>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm font-medium text-primary-textColor'>
                        Total Amount
                      </p>
                      <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm font-semibold'>AED</p>
                          <p>{formatPriceWithCommas(postHandoverAmount)}</p>
                        </div>
                        <div className='flex items-center'>
                          <div className='text-primary-dropdownIconColor mr-1'>
                            |{' '}
                          </div>
                          <p>{paymentPlan?.postHandoverPercentage}</p>
                          <p className='text-primary-dropdownIconColor'>%</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm font-medium text-primary-textColor'>
                        No. of Installments
                      </p>
                      <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                        <div className='flex items-center gap-2'>
                          <p>{paymentPlan?.postHandoverInstallments}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm font-medium text-primary-textColor'>
                        Installment Amount
                      </p>
                      <div className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm font-semibold'>AED</p>
                          <p>
                            {formatPriceWithCommas(
                              postHandoverInstallmentAmount
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {calculatorType === 'mortgage' && (
          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col gap-3 font-primary my-5'>
            <div className='flex justify-between items-center'>
              <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
                Mortgage Calculator
              </p>
            </div>

            <div className='md:flex flex flex-col md:flex-row gap-2 border-b-2 border-b-black py-5 items-top'>
              <div className='md:w-1/2 flex flex-col gap-2'>
                <p className='text-sm text-primary-textColor'>Select Unit</p>
                <button
                  type='button' // Ensure button does not submit the form
                  className='appearance-none bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'
                  onClick={handleModalToggle}>
                  {selectedFloorPlan
                    ? `${selectedFloorPlan.bedroom} Bed, ${selectedFloorPlan.bathroom} Bath, ${selectedFloorPlan.area} ft²`
                    : 'Select Unit'}
                  <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
                </button>
              </div>
              <div className='md:w-1/2 md:pl-5 flex flex-col gap-2'>
                <p className='text-sm font-medium'>Home Price</p>
                <div className='flex gap-2 items-center py-2'>
                  <p className='text-sm text-primary-radioButtonTextColor'>
                    AED
                  </p>
                  <p className='text-xl font-bold text-primary-radioButtonTextColor'>
                    {selectedFloorPlan
                      ? formatPriceWithCommas(selectedFloorPlan.price)
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className='md:flex'>
              <div className='md:w-1/2 flex flex-col gap-5 mt-7'>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-primary-textColor mb-1'>
                    Down Payment percentage
                  </p>
                  <div className='flex items-center md:justify-between gap-2'>
                    <div className='flex items-center appearance-none bg-primary-backgroundColor text-sm w-[8rem] rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor  justify-between border'>
                      <Input
                        className='appearance-none border-none focus:none focus-visible:ring-[0.5]'
                        type='text'
                        placeholder=''
                        name='downPaymentPercentage'
                        value={formik.values.downPaymentPercentage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className='text-primary-dropdownIconColor'>%</p>
                    </div>
                    <div className='bg-primary-inputFieldBackgroundColor rounded-lg w-[16.688rem]'>
                      <div className='flex p-[0.85rem] items-end gap-2'>
                        <p className='text-sm font-semibold'>AED</p>
                        <p className='text-sm font-semibold'>
                          {formik.values.downPayment !== undefined &&
                          !isNaN(formik.values.downPayment)
                            ? formik.values.downPayment.toFixed(2)
                            : '00.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {formik.touched.downPaymentPercentage &&
                  formik.errors.downPaymentPercentage ? (
                    <div className='text-red-500 text-sm'>
                      {formik.errors.downPaymentPercentage}
                    </div>
                  ) : null}
                </div>
                <div className='flex flex-col gap-5'>
                  <div className='md:flex justify-between gap-5'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm text-primary-textColor mb-1'>
                        Term (*in years)
                      </p>
                      <div className='bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                        <Input
                          className='appearance-none border-none focus:none mr-1 focus-visible:ring-[0.5]'
                          type='text'
                          placeholder=''
                          name='term'
                          value={formik.values.term}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        <p className='text-primary-dropdownIconColor'>years</p>
                      </div>
                      {formik.touched.term && formik.errors.term ? (
                        <div className='text-red-500 text-sm'>
                          {formik.errors.term}
                        </div>
                      ) : null}
                    </div>

                    <div className='flex flex-col gap-1'>
                      <p className='text-sm text-primary-textColor mb-1'>
                        Interest Rate in %
                      </p>
                      <div className='bg-primary-backgroundColor text-sm w-full rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor flex justify-between items-center border'>
                        <Input
                          className='appearance-none border-none focus:none mr- focus-visible:ring-[0.5]'
                          type='text'
                          placeholder=''
                          name='interestRate'
                          value={formik.values.interestRate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <p className='text-primary-dropdownIconColor'>%</p>
                      </div>
                      {formik.touched.interestRate &&
                      formik.errors.interestRate ? (
                        <div className='text-red-500 text-sm'>
                          {formik.errors.interestRate}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <Button
                    type='submit'
                    className='p-3 text-base font-bold hover:bg-primary-paymentplancbg font-primary hover:border hover:border-primary-loginBorder hover:text-primary-labelColor text-primary-whiteTextColor bg-primary-labelColor w-[6.125rem]'>
                    Calculate
                  </Button>
                </div>
              </div>

              <div className='md:w-1/2 px-3'>
                <div className='rounded-full lg:m-5 my-5 flex gap-5 justify-center md:justify-start lg:p-2 py-2 flex-wrap md:flex-wrap lg:flex-wrap '>
                  <div className='relative h-[8.5rem]'>
                    <div className='h-full'>
                      <PieChart
                        className='h-full rotate-[200deg]'
                        lineWidth={10}
                        paddingAngle={12}
                        rounded
                        data={[
                          {
                            title: 'Principal',
                            value: formik.values.principal,
                            color: '#3CBF58',
                          },
                          {
                            title: 'Interest',
                            value: formik.values.totalInterestPaid,
                            color: '#0043C5',
                          },
                          {
                            title: 'Other',
                            value: formik.values.otherExpenses,
                            color: '#5C727D',
                          },
                        ]}
                      />
                    </div>

                    <div className='font-primary h-full flex flex-col items-center absolute inset-0 justify-center'>
                      <p className='text-[0.5rem] leading-[1.375rem] text-primary-labelColor'>
                        AED
                      </p>
                      <p className='text-base leading-[1.375rem] font-bold text-primary-labelColor text-ellipsis'>
                        {ellipsesText(
                          formatPriceWithCommas(
                            formik.values.totalCost.toFixed(2)
                          )
                        )}
                      </p>
                      <p className='text-[0.69rem] leading-[1.25rem] font-[300] text-primary-secondaryTextColor'>
                        Total Cost
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 justify-center'>
                    <div className='bg-primary-inputFieldBackgroundColor rounded-lg'>
                      <div className='flex flex-col p-3 pr-8 gap-1'>
                        <p className='text-primary-radioButtonTextColor text-xs font-primary'>
                          Mortgage Payments
                        </p>
                        <div className='flex items-center'>
                          <p className='text-xs text-primary-radioButtonTextColor font-secondary mr-1'>
                            AED
                          </p>
                          <p className='text-primary-textColor font-semibold text-sm font-primary'>
                            {formatPriceWithCommas(
                              formik.values.monthlyPayment.toFixed(2)
                            )}
                          </p>
                          <p className='text-primary-radioButtonTextColor text-xs font-primary'>
                            /month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='bg-primary-inputFieldBackgroundColor rounded-lg'>
                      <div className='flex flex-col p-3 pr-8 gap-1'>
                        <p className='text-primary-radioButtonTextColor text-xs font-primary'>
                          Annual Cost
                        </p>
                        <div className='flex items-center'>
                          <p className='text-xs text-primary-radioButtonTextColor font-secondary mr-1'>
                            AED
                          </p>
                          <p className='text-primary-textColor font-semibold text-sm font-primary'>
                            {formatPriceWithCommas(
                              formik.values.annualCost.toFixed(2)
                            )}
                          </p>
                          <p className='text-primary-radioButtonTextColor text-xs font-primary'>
                            /yr
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='px-5 py-2 flex justify-between'>
                    <div className='flex items-center gap-1'>
                      <div className='h-[0.4375rem] w-[0.4375rem] rounded-full bg-primary-labelColor'></div>
                      <p className='text-sm font-semibold text-primary-radioButtonTextColor'>
                        Amount Financed:
                      </p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium text-primary-radioButtonTextColor'>
                        AED
                      </p>
                      <p className='text-sm font-medium text-primary-textColor'>
                        {formatPriceWithCommas(
                          formik.values.principal.toFixed(2)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='border-t-2 rounded-xl px-5 py-2 flex justify-between'>
                    <div className='flex items-center gap-1'>
                      <div className='h-[0.4375rem] w-[0.4375rem] rounded-full bg-[#0043C5]'></div>
                      <p className='text-sm font-semibold text-primary-radioButtonTextColor'>
                        Total Interest Paid
                      </p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium text-primary-radioButtonTextColor'>
                        AED
                      </p>
                      <p className='text-sm font-medium text-primary-textColor'>
                        {formatPriceWithCommas(
                          formik.values.totalInterestPaid.toFixed(2)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='border-t-2 rounded-xl px-5 py-2 flex justify-between'>
                    <div className='flex items-center gap-1'>
                      <div className='h-[0.4375rem] w-[0.4375rem] rounded-full bg-[#5C727D]'></div>
                      <p className='text-sm font-semibold text-primary-radioButtonTextColor'>
                        Other Expenses
                      </p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium text-primary-radioButtonTextColor'>
                        AED
                      </p>
                      <p className='text-sm font-medium text-primary-textColor'>
                        {formatPriceWithCommas(
                          formik.values.otherExpenses.toFixed(2)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='border-t-2 rounded-xl px-5 py-2 flex justify-between'>
                    <p className='text-sm font-semibold text-primary-radioButtonTextColor'>
                      Total Cost
                    </p>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium text-primary-radioButtonTextColor'>
                        AED
                      </p>
                      <p className='text-xl font-medium text-primary-textColor'>
                        {formatPriceWithCommas(
                          formik.values.totalCost.toFixed(2)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-t-2 px-5 py-2 flex justify-between'></div>
          </form>
        )}
      </div>
      {isModalOpen && (
        <FloorPlanModal
          floorPlan={attributes?.floorPlan}
          handleFloorPlanSelect={handleFloorPlanSelect}
          handleModalToggle={handleModalToggle}
        />
      )}
    </>
  );
};
export default PaymentPlanClient;
