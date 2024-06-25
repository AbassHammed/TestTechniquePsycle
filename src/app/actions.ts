'use server';

import { TrainingArray } from '@/types';

export const getTrainings = async (): Promise<TrainingArray> => {
  'use server';
  const response = await fetch('http://localhost:5000/trainings');

  return response.json();
};
