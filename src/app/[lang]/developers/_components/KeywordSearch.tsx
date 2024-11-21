'use client';
import { FaSearch } from 'react-icons/fa';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
type Props = {
  debounceFunction: (text: string) => void;
  initialKeyword?: string;
};
const KeywordSearch = ({ debounceFunction, initialKeyword }: Props) => {
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get('keyword') || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      debounceFunction(text);
    },
    [text]
  );
  const debounced = useDebouncedCallback(() => {
    debounceFunction(text);
  }, 750);

  useEffect(() => {
    debounced();
  }, [text]);

  useEffect(() => {
    setText(initialKeyword || '');
  }, [initialKeyword]);

  return (
    <div className='relative w-full'>
      <form
        onSubmit={handleSubmit}
        className='w-full flex items-center gap-x-2'>
        <input
          type='text'
          id='simple-search'
          onChange={handleChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-searchButtonColor focus:border-primary-labelColor block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-labelColor dark:focus:border-primary-labelColor'
          placeholder='Search Developers...'
          required
          value={text}
        />
        <button
          type='submit'
          className='w-14 h-10  hover:opacity-90 bg-primary-labelColor rounded-md flex items-center justify-center cursor-pointer '>
          <FaSearch className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default KeywordSearch;
