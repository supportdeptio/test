'use server';

import { initPlasmicLoader } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../../../../plasmic-init';
import PlasmicClientPage from './client-page';

// Initialize the Plasmic loader
const plasmicLoader = initPlasmicLoader({
  projects: PLASMIC.projects,
  preview: PLASMIC.preview
});

// Fetch all dynamic paths that need to be pre-rendered
export async function generateStaticParams() {
  try {
    const pages = await plasmicLoader.fetchPages();
    console.log('Available Plasmic pages:', pages);
    return pages.map((page) => ({
      catchall: page.path.split("/").filter(Boolean),
    }));
  } catch (error) {
    console.error('Error fetching Plasmic pages:', error);
    return [];
  }
}

// Configure page options
export const dynamic = 'force-dynamic'; // Always fetch fresh data
export const fetchCache = 'force-no-store'; // Disable caching
export const runtime = 'nodejs'; // Use Node.js runtime for better compatibility

export default async function PlasmicLoaderPage({
  params,
}: {
  params?: { catchall?: string[] };
}) {
  const plasmicPath = '/' + (params?.catchall?.join('/') || '');
  console.log('Loading Plasmic page:', { params, plasmicPath });

  // If no path is provided, render the home page
  if (!params?.catchall?.length) {
    console.log('No path provided, rendering home page');
  }

  // Pre-fetch the page data to validate it exists
  try {
    await plasmicLoader.fetchComponentData(plasmicPath);
  } catch (error) {
    console.error('Error fetching Plasmic page data:', error);
    // The error will be caught by the ErrorBoundary in the client component
  }

  return <PlasmicClientPage plasmicPath={plasmicPath} />;
}
