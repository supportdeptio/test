'use client';

import { PlasmicRootProvider, initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "../../plasmic-init";
import React from 'react';

// Initialize the Plasmic loader outside the component
const plasmicLoader = initPlasmicLoader({
  projects: PLASMIC.projects,
  preview: PLASMIC.preview
});

interface PlasmicHostProps {
  children?: React.ReactNode;
}

function PlasmicHost({ children }: PlasmicHostProps) {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    // Check if Plasmic is properly configured
    if (!PLASMIC.projects[0]?.id || !PLASMIC.projects[0]?.token) {
      setError(new Error('Plasmic configuration is missing'));
    }
  }, []);

  if (error) {
    console.error('Plasmic error:', error);
    return <div>Error loading Plasmic: {error.message}</div>;
  }

  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <PlasmicRootProvider
      loader={plasmicLoader}
    >
      {children}
    </PlasmicRootProvider>
  );
}

export default PlasmicHost;
