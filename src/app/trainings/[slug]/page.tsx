'use client';

import React from 'react';

import NavBar from '@/components/NavBar';
import StatData from '@/components/StatData';
import TopBar from '@/components/TopBar';
import TrainingInfo from '@/components/TrainingInfo';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  return (
    <div className="flex flex-row h-screen">
      <NavBar />
      <div className="flex-auto space-y-4 max-h-screen">
        <TopBar TrainingName={`Apprentissage #${params.slug}`} />
        <TrainingInfo TrainingID={params.slug} />
      </div>
      <StatData analysisID="1" />
    </div>
  );
}
