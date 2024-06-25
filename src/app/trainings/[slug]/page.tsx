import React from 'react';

import NavBar from '@/components/NavBar';
import StatData from '@/components/StatData';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  return (
    <div className="flex flex-row h-screen">
      <NavBar />
      <div className="flex-auto space-y-4">session : {params.slug}</div>
      <StatData />
    </div>
  );
}
