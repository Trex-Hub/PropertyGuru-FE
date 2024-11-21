import HeaderClient from './client';

export default function Header({ lang }: any) {
  return (
    <>
      {' '}
      {/* <div className=' bg-[#eeeeee] items-center justify-center w-full lg:flex md:flex hidden'>
        <div
          id='div-gpt-ad-1649842088464-0'
          className='w-[728px] h-[90px] flex items-center justify-center'>
          {typeof window !== 'undefined' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `googletag.cmd.push(function() { googletag.display('div-gpt-ad-1649842088464-0'); });`,
              }}
            />
          )}
        </div>
      </div> */}
      <HeaderClient lang={lang} />
    </>
  );
}
