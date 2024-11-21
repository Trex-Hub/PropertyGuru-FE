// layout.tsx
import React, { ReactNode, Suspense } from 'react';
import './globals.css';
import { Poppins, Nunito_Sans, Montserrat } from 'next/font/google';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import UserProvider from '@/contexts/UserContext';
import WishListProvider from '@/contexts/WishlistContext';
import SubscribedDeveloperProvider from '@/contexts/SubscribedDevelopers';
import { LoadingProvider } from '@/contexts/LoadingContext';
import Loader from '@/components/Loader';
import { LogInFormPopUpProvider } from '@/contexts/LogInFormPopUpContext';
import { FooterLoader } from '@/components/Loading';
import StickyButton from '@/components/StickyButton';
import AdContainer from '@/components/AdContainer';
import TwiceRender from '@/components/TwiceRender/TwiceRender';
import { ResetFormPopupProvider } from '@/contexts/ResetFormPopupContext';
import { MissingDetailsPopupProvider } from '@/contexts/MissingDetailsPopupContext';
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  return {
    title: 'Buy Properties in Dubai | Propertyguru',
    description:
      'Discover the best properties to buy in Dubai with Propertyguru. Find your dream home today! Buy properties in Dubai with ease.',
    openGraph: {
      images: ['/images/home/thumbnail.jpeg'],
    },
    alternates: {
      canonical: `/${params?.lang}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: ['propertyguru', 'property', 'guru'],
  };
};
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}
interface RootLayoutProps {
  children: ReactNode;
  params: {
    lang: string;
  };
}
export default function RootLayout({ children, params }: RootLayoutProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${process.env.BASE_FE_URL}`,
        url: `${process.env.BASE_FE_URL}`,
        name: 'Buy Properties in Dubai | Propertyguru',
        isPartOf: { '@id': `${process.env.BASE_FE_URL}/#website` },
        about: { '@id': `${process.env.BASE_FE_URL}/#organization` },
        primaryImageOfPage: {
          '@id': `${process.env.BASE_FE_URL}/#primaryimage`,
        },
        image: { '@id': `${process.env.BASE_FE_URL}/#primaryimage` },
        thumbnailUrl: `${process.env.BASE_FE_URL}/${params?.lang}/images/home/thumbnail.jpeg`,
        datePublished: '2019-02-02T07:23:02+00:00',
        dateModified: '2024-06-06T11:58:49+00:00',
        description:
          'Discover the best properties to buy in Dubai with Propertyguru. Find your dream home today! Buy properties in Dubai with ease.',
        breadcrumb: { '@id': `${process.env.BASE_FE_URL}/#breadcrumb` },
        inLanguage: 'en-US',
        potentialAction: [
          { '@type': 'ReadAction', target: [`${process.env.BASE_FE_URL}/`] },
        ],
      },
      {
        '@type': 'ImageObject',
        inLanguage: 'en-US',
        '@id': `${process.env.BASE_FE_URL}/#primaryimage`,
        url: `${process.env.BASE_FE_URL}/${params?.lang}/images/home/thumbnail.jpeg`,
        contentUrl: `${process.env.BASE_FE_URL}/${params?.lang}/images/home/thumbnail.jpeg`,
        width: 1280,
        height: 853,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${process.env.BASE_FE_URL}/#breadcrumb`,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home' }],
      },
    ],
  };
  const organizationLd = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: 'PropertyGuru.ae',
    url: `${process.env.BASE_FE_URL}`,
    logo: `${process.env.BASE_FE_URL}/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-4-1234567',
      contactType: 'Customer Service',
    },
    sameAs: [
      'https://www.facebook.com/propertyguru',
      'https://www.twitter.com/propertyguru',
      'https://www.instagram.com/propertyguru',
    ],
  };
  const websiteLd = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'PropertyGuru.ae',
    url: `${process.env.BASE_FE_URL}`,
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${process.env.BASE_FE_URL}/${params?.lang}/advanced-search?city={city}&area={area}&developer={developer}&propertyType={propertyType}&minPrice={minPrice}&maxPrice={maxPrice}&readiness={readiness}&page={page}`,
        },
        'query-input': [
          'name=city',
          'name=area',
          'name=developer',
          'name=propertyType',
          'name=minPrice',
          'name=maxPrice',
          'name=readiness',
          'name=page',
        ],
      },
    ],
  };

  return (
    <html
      lang={params.lang}
      className={`${poppins.variable} ${nunito.variable} ${montserrat.variable}`}>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
        />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <Script id='jsonld-schema' type='application/ld+json'>
          {JSON.stringify(jsonLd)}
        </Script>
        <Script id='organization-schema' type='application/ld+json'>
          {JSON.stringify(organizationLd)}
        </Script>
        <Script id='search-action-schema' type='application/ld+json'>
          {JSON.stringify(websiteLd)}
        </Script>
        <Script
          async
          src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        />
        <Script src='https://imasdk.googleapis.com/js/sdkloader/ima3.js'></Script>
        <Script id='gtm-head' strategy='afterInteractive'>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5TVWXK8');`}
        </Script>
        {/* <!-- CallGear --> */}
        <Script
          type='text/javascript'
          async
          src='https://app.callgear.com/static/cs.min.js?k=LYFy077156PihRninLAEnNzWIiZGnx9t'></Script>
        {/* <!-- CallGear --> */}
        {/* Bitrix 24 Script */}
        <Script
          type='text/javascript'
          async
          src='https://custom.callgear.com/static/bx_webforms/v1/bundle.js'></Script>
        {/* Bitrix 24 Script */}
      </head>
      <body
        className={`${poppins.variable} ${nunito.variable} ${montserrat.variable}`}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5TVWXK8'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <LoadingProvider>
          <MissingDetailsPopupProvider>
            <UserProvider>
              <WishListProvider>
                <SubscribedDeveloperProvider>
                  <ResetFormPopupProvider>
                    <LogInFormPopUpProvider>
                      <div className='lg:flex  md:flex hidden lg:justify-center lg:items-center md:justify-center md:items-center'>
                        <TwiceRender>
                          <AdContainer
                            slotId='div-gpt-ad-1726822489788-0'
                            slotName='/22718860182/pg-homepage-leaderboard'
                            minWidth='728'
                            minHeight='90'
                            backgroundColor='bg-[#eeeeee]'
                          />
                        </TwiceRender>
                      </div>
                      <Header lang={params.lang} />
                      {children}
                      <Suspense fallback={<FooterLoader />}>
                        <Footer lang={params.lang} />
                      </Suspense>
                      <StickyButton />
                      <Loader />
                      <Toaster />
                    </LogInFormPopUpProvider>
                  </ResetFormPopupProvider>
                </SubscribedDeveloperProvider>
              </WishListProvider>
            </UserProvider>
          </MissingDetailsPopupProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
