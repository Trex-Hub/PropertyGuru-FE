import Image from 'next/image';

export default function MortgageCalculatorHeader() {
  return (
    <div className='flex flex-col xl:flex-row justify-center items-center gap-2 mt-10'>
      <h1 className='font-secondary text-center text-[2rem] md:text-[2.5rem] font-bold text-primary-primaryTextColor'>
        Mortgage Calculator
      </h1>
      <div className='flex flex-col p-0 xl:px-40 justify-start items-start align-center gap-2 xl:hidden'>
        <h2 className='font-secondary text-[1.5rem] font-bold text-primary-primaryTextColor '>
          Sponsored By
        </h2>
        <Image
          src='/AbudhabiBankLogo.svg'
          alt='Sponsor Logo'
          height={100}
          width={200}
          className='my-10'
        />
      </div>
    </div>
  );
}
