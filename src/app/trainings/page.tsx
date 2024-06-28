/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { getTrainings } from '@/app/actions';
import Loading from '@/app/loading';

export default function TrainingPage() {
  const { push } = useRouter();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const Trainings = await getTrainings();
      if (Trainings.length > 0) {
        const LastestTraining = Trainings[Trainings.length - 1];
        push(`/trainings/${LastestTraining.id}`);
      }
    };

    fetchAndRedirect();
  }, []);

  return <Loading />;
}
