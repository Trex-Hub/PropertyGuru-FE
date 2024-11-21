import Image from 'next/image';

const FeaturedProperties = () => {
  const properties = [
    {
      img: 'https://picsum.photos/seed/someone12/1200/1300',
      name: 'Property No. 1',
      price: '1,151,000',
      idx: 2,
    },
    {
      img: 'https://picsum.photos/seed/someone13/1200/1300',
      name: 'Property No. 1',
      price: '1,151,000',
      idx: 3,
    },
    {
      img: 'https://picsum.photos/seed/someone14/1200/1300',
      name: 'Property No. 1',
      price: '1,151,000',
      idx: 4,
    },
    {
      img: 'https://picsum.photos/seed/someone15/1200/1300',
      name: 'Property No. 1',
      price: '1,151,000',
      idx: 5,
    },
  ];
  return (
    <div className='py-8 px-6 m-3 mt-4 bg-primary-similarlistingbg rounded-xl hidden lg:block'>
      <p className='text-[1rem] leading-[1.25rem] text-primary-textColor font-secondary font-bold'>
        Featured Properties
      </p>
      <div className='flex flex-col gap-3 mt-6 overflow-auto'>
        {properties.map(property => {
          return (
            <div className='flex items-center' key={property.idx}>
              <div>
                <Image
                  className='h-[6.375rem] w-[8.313rem] rounded-md'
                  src={property.img}
                  width={133}
                  height={101}
                  alt='...'
                />
              </div>
              <div className='mx-4'>
                <p className='font-bold text-[1rem] leading-[1.375rem] text-primary-primaryTextColor'>
                  {property.name}
                </p>
                <div className='flex gap-1 items-center xl:items-baseline'>
                  <p className='text-[0.9rem] xl:text-[1rem] leading-[1.4rem] xl:leading-[1.5rem] text-primary-primaryTextColor font-[400]'>
                    Starting from
                  </p>
                  <p className='text-[0.9rem] xl:text-[1.25rem] leading-[1.55rem] xl:leading-[1.75rem] text-primary-labelColor font-bold'>
                    {property.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProperties;
