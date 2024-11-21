'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const PriceTrends = () => {
  const data = [
    {
      name: 'Jan 24',
      uv: 0,
      amt: 2400,
    },
    {
      name: 'Feb 24',
      uv: 400000,
      amt: 2210,
    },
    {
      name: 'Mar 24',
      uv: 800000,
      amt: 2290,
    },
    {
      name: 'Apr 24',
      uv: 750080,
      amt: 2000,
    },
    {
      name: 'May 24',
      uv: 1000000,
      amt: 2181,
    },
    {
      name: 'Jun 24',
      uv: 600000,
      amt: 2181,
    },
  ];
  return (
    <div className='p-6 pt-10'>
      <p className='font-secondary text-[1.125rem] md:text-[1.5rem] leading-[1.25rem] font-bold text-primary-primaryTextColor'>
        Price Trends
      </p>
      <p className='my-3 text-[0.75rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem] mt-7'>
        Studio apartments rented in Prive Residence and Dubai Hills Estate
      </p>
      <div className='mt-6'>
        <div className='w-full md:w-[90%] h-[15rem] lg:h-[20.813rem] text-[0.75rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              width={1000}
              height={300}
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 5,
              }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                className='text-[0.75rem] md:text-[0.8rem] leading-[1.125rem] md:leading-[1.5rem]'
                dataKey='name'
              />
              <YAxis className='text-[0.75rem] md:text-[0.8rem] leading-[1.125rem] md:leading-[1.5rem]' />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type='monotone'
                dataKey='pv'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
              <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>

          {/* <Image width={751} height={333} src='/chart.svg' alt='...' /> */}
        </div>
      </div>
    </div>
  );
};

export default PriceTrends;
