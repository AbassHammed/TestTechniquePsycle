'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { getTraining, getTrainings } from '@/app/actions';
import Loading from '@/app/loading';
import { ImageList, NavBar, StatData, TopBar, TrainingInfo } from '@/components';
import useKeyboardShortcuts from '@/hooks/useKeyBoardShortcut';
import { TrainingItem } from '@/types';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const [training, setTraining] = useState<TrainingItem>();
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [error, setError] = useState<Error | null>();
  const { push } = useRouter();

  useKeyboardShortcuts([
    {
      keyCombo: 'ctrl+arrowleft',
      callback: () => {
        if (training && trainings && training.id > 1) {
          const lastTraining = trainings[training.id - 2];
          if (lastTraining) {
            push(`/trainings/${lastTraining.id}`);
          }
        }
      },
    },
    {
      keyCombo: 'ctrl+arrowright',
      callback: () => {
        if (training && trainings && training.id < trainings.length) {
          const nextTraining = trainings[training.id];
          if (nextTraining) {
            push(`/trainings/${nextTraining.id}`);
          }
        }
      },
    },
  ]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getTraining(params.slug);
        const results = await getTrainings();
        setTrainings(results);
        setTraining(data);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchAnalysis();
  }, [params.slug]);

  if (error) {
    throw new Error(error.message);
  }

  if (!training) {
    return <Loading />;
  }

  return (
    <div className="flex flex-row h-screen">
      <NavBar />
      <div className="flex-auto space-y-4 max-h-screen overflow-y-auto">
        <TopBar TrainingName={training.name} />
        <TrainingInfo TrainingID={params.slug} />
        <ImageList />
      </div>
      <StatData analysisID={training.analysis_id.toString()} />
    </div>
  );
}
