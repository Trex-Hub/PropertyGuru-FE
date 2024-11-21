'use client';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleAdSense from '../GoogleAdSense';

interface AdBannerProps {
  slotName: string;
  slotId: string;
  minWidth: string;
  minHeight: string;
  backgroundColor?: string;
}

const AdContainer = ({
  slotName,
  slotId,
  minWidth,
  minHeight,
  backgroundColor,
}: AdBannerProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering

  useEffect(() => {
    setIsClient(true); // Ensure the component is mounted on the client

    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setIsTransitioning(false);
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  // Only render GoogleAdSense once the component is mounted on the client-side
  if (!isClient) return null;

  return (
    <GoogleAdSense
      slotId={slotId}
      slotName={slotName}
      minWidth={minWidth}
      minHeight={minHeight}
      isTransitioning={isTransitioning}
      backgroundColor={backgroundColor}
    />
  );
};

export default AdContainer;
