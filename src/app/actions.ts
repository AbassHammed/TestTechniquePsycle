'use server';

import { Analysis, countObj, DataArray, TrainingArray } from '@/types';

export const getAnalysis = async (analysisID: string): Promise<Analysis> => {
  const response = await fetch(`http://localhost:5000/analysis/${analysisID}`, {
    next: { revalidate: 3600 },
  });

  return response.json();
};

export const getTrainings = async (): Promise<TrainingArray> => {
  const response = await fetch('http://localhost:5000/trainings');

  return response.json();
};

export const getLabelsCount = async (label: string): Promise<countObj> => {
  const response = await fetch(`http://localhost:5000/data/count?label=${label}`);

  return response.json();
};

export const getData = async (): Promise<DataArray> => {
  const response = await fetch('http://localhost:5000/data', { next: { revalidate: 180 } });

  return response.json();
};
