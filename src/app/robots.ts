import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/sbf-gestion/'], // Disallow API, Next internal, and Admin dashboard
    },
    sitemap: 'https://sbfinance.bj/sitemap.xml',
  };
}
