import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Farah Samy - Data Analyst Specialist',
  description: 'Portfolio of Farah Samy, a skilled Data Analyst Specialist with expertise in Python, Power BI, and data visualization. Explore projects and experience.',
  generator: 'v0.dev',
  keywords: ['Farah Samy', 'Data Analyst', 'Portfolio', 'Python', 'Power BI', 'Data Visualization'],
  authors: [{ name: 'Farah Samy' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Farah Samy - Data Analyst Specialist',
    description: 'Portfolio of Farah Samy, a skilled Data Analyst Specialist with expertise in Python, Power BI, and data visualization. Explore projects and experience.',
    url: 'https://farahsamy.com',
    siteName: 'Farah Samy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Farah Samy - Data Analyst Specialist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}