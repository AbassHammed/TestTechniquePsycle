'use client';

import React, { useEffect, useState } from 'react';

import { getTraining } from '@/app/actions';
import { ImageList, NavBar, StatData, TopBar, TrainingInfo } from '@/components';
import { TrainingItem } from '@/types';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const [analysis, setAnalysis] = useState<TrainingItem>();
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getTraining(params.slug);
        setAnalysis(data);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchAnalysis();
  }, [params.slug]);

  if (error) {
    throw new Error(error.message);
  }

  if (!analysis) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-row h-screen">
      <NavBar />
      <div className="flex-auto space-y-4 max-h-screen overflow-y-auto">
        <TopBar TrainingName={analysis.name} />
        <TrainingInfo TrainingID={params.slug} />
        <ImageList />
      </div>
      <StatData analysisID={analysis.analysis_id.toString()} />
    </div>
  );
}
