import { Poppins, Nunito_Sans, Montserrat } from 'next/font/google';
import React from 'react';
import '../[lang]/globals.css';
import Script from 'next/script';

export const metadata = {
  title:
    'Emaar Lead Submission Form - Propertyguru.ae | Buy Properties in Dubai',
  description: 'Not Specified',
  robots: {
    index: false,
    follow: false,
  },
};
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${nunito.variable} ${montserrat.variable}`}>
      <head>
        <Script id='gtm-script' strategy='beforeInteractive'>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5TVWXK8');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5TVWXK8'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
