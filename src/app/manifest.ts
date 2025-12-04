import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Trukonnect',
    short_name: 'Trukonnect',
    description: 'Trukonnect application',
    start_url: '/',
    display: 'standalone',
    background_color: '#fd7701',
    theme_color: '#fd7701',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
