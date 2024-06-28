/* eslint-disable quotes */
'use server';

import { Analysis, countObj, DataArray, TrainingArray, TrainingItem } from '@/types';

export const getAnalysis = async (analysisID: string): Promise<Analysis> => {
  const response = await fetch(`http://[::1]:5000/analysis/${analysisID}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getTrainings = async (): Promise<TrainingArray> => {
  const response = await fetch('http://[::1]:5000/trainings');

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getTraining = async (TrainingID: string): Promise<TrainingItem> => {
  const response = await fetch(`http://[::1]:5000/trainings/${TrainingID}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getLabelsCount = async (label: string): Promise<countObj> => {
  const response = await fetch(`http://[::1]:5000/data/count?label=${label}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getData = async (): Promise<DataArray> => {
  const response = await fetch('http://[::1]:5000/data', { next: { revalidate: 180 } });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getTrainingResult = async (TrainingID: string) => {
  const response = await fetch(`http://[::1]:5000/trainings/${TrainingID}/result`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getDataCount = async (): Promise<countObj> => {
  const response = await fetch('http://[::1]:5000/data/count');

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export async function postTrainingData(): Promise<TrainingItem> {
  try {
    const response = await fetch('http://[::1]:5000/trainings', {
      method: 'POST',
    });

    return response.json();
  } catch (error) {
    throw new Error("Erreur lors de création de l'apprentissage");
  }
}
