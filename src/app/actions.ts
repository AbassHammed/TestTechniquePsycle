'use server';

import { Analysis, countObj, TrainingArray } from '@/types';

interface getAnalysisProps {
  analysisID: string;
}

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
  console.log(label);
  const response = await fetch(`http://localhost:5000/data/count?label=${label}`);

  return response.json();
};
