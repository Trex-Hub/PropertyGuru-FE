import Cookies from 'js-cookie';

export const getItem = (key: string) => Cookies.get(key);
export const setItem = (key: string, value: any) => Cookies.set(key, value);
