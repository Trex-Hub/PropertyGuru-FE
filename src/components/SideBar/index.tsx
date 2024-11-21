import AdVideo from '../AdVideo';

export default function SideBar() {
  return (
    <div className='lg:w-[40%] py-4 lg:p-4 flex flex-col gap-5 lg:top-0 h-full'>
      <div className='hidden lg:block'>
        <AdVideo />
      </div>
    </div>
  );
}
