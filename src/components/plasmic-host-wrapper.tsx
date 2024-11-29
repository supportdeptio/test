'use client';

import dynamic from 'next/dynamic';

const PlasmicHost = dynamic(
  () => import('@/components/plasmic-host'),
  { ssr: false }
);

export function PlasmicHostWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return <PlasmicHost>{children}</PlasmicHost>;
}
