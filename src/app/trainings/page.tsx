import React from 'react';

import { TrainingArray } from '@/types';

const getTrainings = async (): Promise<TrainingArray> => {
  const response = await fetch('http://localhost:5000/trainings');

  return response.json();
};

export default async function TrainingPage() {
  const Trainings = await getTrainings();
  console.log(Trainings);

  return <div>Hammed aabass</div>;
}
