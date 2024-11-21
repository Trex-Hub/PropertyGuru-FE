'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPriceWithCommas, ellipsesText } from '@/utils/utilities';
import { mortgagePageSchema } from '@/utils/validation-schemas';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function MortgageCalculatorForm() {
  const formik = useFormik({
    initialValues: {
      salePrice: 1000000,
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
    validationSchema: mortgagePageSchema,
    onSubmit: values => {
      const downPayment =
        (values.salePrice * parseFloat(values.downPaymentPercentage)) / 100;
      const loanAmount = values?.salePrice - downPayment;
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
    const downPayment =
      (formik.values.salePrice *
        parseFloat(formik.values.downPaymentPercentage)) /
      100;
    formik.setFieldValue('downPayment', downPayment);
  }, [formik.values.salePrice, formik.values.downPaymentPercentage]);

  return (
    <div className='bg-primary-backgroundColor'>
      <div className='p-6 flex flex-col'>
        <p className='text-lg md:text-2xl font-secondary font-bold text-primary-primaryTextColor'>
          Mortgage Calculator
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col gap-3 font-primary my-5 justify-center w-full'>
          <div className='md:flex flex flex-col md:flex-row gap-2 border-b border-b-primary-dividerColor py-5 items-top'>
            <div className='md:w-1/2 flex flex-col gap-2'>
              <p className='text-sm font-medium'>Sale Price</p>
              <div className='flex items-center appearance-none bg-primary-backgroundColor text-sm rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor  justify-between border'>
                <p className='text-sm text-primary-radioButtonTextColor'>AED</p>
                <Input
                  className='appearance-none border-none text-xl font-bold text-primary-radioButtonTextColor focus:none mr-1 focus-visible:ring-[0.5]'
                  type='text'
                  placeholder=''
                  name='salePrice'
                  value={formik.values.salePrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.salePrice && formik.errors.salePrice ? (
                <div className='text-red-500 text-sm'>
                  {formik.errors.salePrice}
                </div>
              ) : null}
            </div>
          </div>
          <div className='md:flex'>
            <div className='md:w-1/2 flex flex-col gap-5 mt-7'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm font-medium text-primary-textColor mb-1'>
                  Down Payment percentage
                </p>
                <div className='flex items-center md:justify-between gap-2'>
                  <div className='flex items-center appearance-none bg-primary-backgroundColor text-sm w-[7.5rem] rounded-xl px-4 py-2 h-[3rem] focus:outline-none text-primary-radioButtonTextColor  justify-between border'>
                    <Input
                      className='appearance-none border-none focus:none mr-1 focus-visible:ring-[0.5]'
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
              <div className='rounded-full lg:mx-5 my-5 flex gap-5 justify-center md:justify-between lg:p-2 py-2 flex-wrap md:flex-wrap lg:flex-wrap '>
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
                    <p className='text-xs font-bold'>AED</p>
                    <p className='text-lg leading-[1.375rem] font-bold text-ellipsis'>
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
      </div>
    </div>
  );
}
