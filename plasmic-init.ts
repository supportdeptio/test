'use client';

import { PlasmicRootProvider } from '@plasmicapp/loader-nextjs';

// Plasmic project configuration
const projectId = process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID || process.env.PLASMIC_PROJECT_ID;
const apiToken = process.env.NEXT_PUBLIC_PLASMIC_PROJECT_API_TOKEN || process.env.PLASMIC_PROJECT_API_TOKEN;

if (!projectId || !apiToken) {
  console.error('Plasmic project configuration is missing:', { projectId, apiToken });
}

export const PLASMIC = {
  projects: [
    {
      id: projectId as string,
      token: apiToken as string,
    },
  ],
  preview: process.env.NODE_ENV === 'development',
};
