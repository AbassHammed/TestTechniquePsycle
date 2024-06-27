'use client';

import { useEffect, useState } from 'react';

import { TrainingItem } from '@/types';

const POLLING_INTERVAL = 1000; // 1 second

const useTraining = (TrainingID: string) => {
  const [training, setTraining] = useState<TrainingItem>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/trainings/${TrainingID}`);
        const data = await response.json();
        setTraining(data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchTraining();

    const intervalId = setInterval(() => {
      fetchTraining();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [TrainingID]);

  return { training, loading, error };
};

export default useTraining;
