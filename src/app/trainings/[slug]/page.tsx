'use client';

import React from 'react';

import { ImageList, NavBar, StatData, TopBar, TrainingInfo } from '@/components';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  return (
    <div className="flex flex-row h-screen">
      <NavBar />
      <div className="flex-auto space-y-4 max-h-screen overflow-y-auto">
        <TopBar TrainingName={`Apprentissage #${params.slug}`} />
        <TrainingInfo TrainingID={params.slug} />
        <ImageList />
      </div>
      <StatData analysisID="1" />
    </div>
  );
}
