// This file contains the filter section of the search bar result page. Changes requested on 21 October.

// import { PiCopyLight } from 'react-icons/pi';
// import { IoBedOutline } from 'react-icons/io5';
// import { LuBath } from 'react-icons/lu';
// import { FiPieChart } from 'react-icons/fi';
// import { getShortText } from '@/utils/utilities';
// {
//   /* For larger screens */
// }

// const { minArea, maxArea, bedroom, bathroom, possession } = searchParams;
// <div className='hidden lg:flex md:flex gap-3 flex-wrap'>
//   <div className='relative'>
//     <button className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[8.5rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center gap-2'>
//       <PiCopyLight className='text-primary pointer-events-none text-primary-primaryTextColor' />
//       {getShortText([minArea, maxArea, 'Area(ft2)']) || 'Area (ft2)'}
//     </button>
//   </div>

//   <div className='relative'>
//     <button className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[9.688rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center gap-2'>
//       <IoBedOutline className='text-primary pointer-events-none text-primary-primaryTextColor' />
//       {getShortText([bedroom, 'Bedroom']) || 'Bedroom'}
//     </button>
//   </div>
//   <div className='relative'>
//     <button className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[10.188rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center gap-2'>
//       <LuBath className='text-primary pointer-events-none text-primary-primaryTextColor' />
//       {getShortText([bathroom, 'Bathroom']) || 'Bathroom'}
//     </button>
//   </div>
//   <div className='relative'>
//     <button className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[12.375rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center gap-2'>
//       <FiPieChart className='text-primary pointer-events-none text-primary-primaryTextColor' />
//       {getShortText([possession]) || 'Possession status'}
//     </button>
//   </div>
//   <div className='flex'>
// <button className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor rounded-l-xl p-2 h-[2rem] focus:outline-none text-primary-textColor flex items-center gap-2'>
//   <FiPieChart className='text-primary pointer-events-none text-primary-primaryTextColor' />
// </button>
// <button
//   className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[9.063rem] rounded-xl p-2 h-[2rem] focus:outline-none text-primary-textColor flex items-center justify-between shadow-md'
//   onClick={toggleModal}>
//   <MdFilterList className='text-primary pointer-events-none text-primary-textColor' />
//   More Filters
//   <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
// </button>
// <MoreFilterPopup
//   isOpen={isModalOpen}
//   toggleModal={toggleModal}
//   searchParams={searchParams}
// />
//   </div>
// </div>;

// {
//   /* For smaller screens */
// }
// <div className='flex lg:hidden md:hidden gap-1'>
//   <div className='relative'>
//     <button className='appearance-none text-xs bg-primary-settingsBackgroundColor w-[8rem] rounded-xl p-1 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
//       <IoBedOutline className='text-primary pointer-events-none text-primary-primaryTextColor' />
//       {getShortText([bedroom]) || 'Bedroom'}
//       <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
//     </button>
//   </div>
//   <div className='relative'>
//     <button className='appearance-none text-xs bg-primary-settingsBackgroundColor w-[10rem] rounded-xl p-1 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-between'>
//       <FiPieChart className='text-primary pointer-events-none text-primary-primaryTextColor' />
//       {getShortText([possession]) || 'Possession status'}
//       <IoIosArrowDown className='text-primary pointer-events-none text-primary-dropdownIconColor' />
//     </button>
//   </div>
//   <button className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[2rem] rounded-l-xl p-1 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-center'>
//     <LuBath className='text-primary pointer-events-none text-primary-primaryTextColor' />
//   </button>
//   <button
//     className='appearance-none text-xs md:text-base bg-primary-settingsBackgroundColor w-[2rem] rounded-xl p-1 h-[2rem] focus:outline-none text-primary-secondaryTextColor flex items-center justify-center'
//     onClick={toggleModal}>
//     <MdFilterList className='text-primary pointer-events-none text-primary-primaryTextColor' />
//   </button>
//   <MoreFilterPopup
//     isOpen={isModalOpen}
//     toggleModal={toggleModal}
//     searchParams={searchParams}
//   />
// </div>;
