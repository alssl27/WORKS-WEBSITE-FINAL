import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ABS Properties',
    short_name: 'ABS Properties',
    description: 'Property sales, lettings and management in Oldham and Greater Manchester.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#071b36',
    icons: [
      {
        src: '/images/abs-properties-logo.png',
        sizes: '1024x1536',
        type: 'image/png',
      },
    ],
  };
}
