'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Redirect to the home page when a 404 is encountered
    redirect('/');
  }, []);

  return null;
}
