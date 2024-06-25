import React from 'react';

import NavBar from '@/components/NavBar';
import StatData from '@/components/StatData';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-row h-screen">
      <NavBar />
      <div className="flex-auto space-y-4"></div>
      <StatData />
    </div>
  );
}
