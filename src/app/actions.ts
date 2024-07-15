/* eslint-disable quotes */
'use server';

import { Analysis, countObj, DataArray, TrainingArray, TrainingItem } from '@/types';

// Ces méthodes sont des fonctions asynchrones qui effectuent des appels HTTP à un serveur local pour obtenir ou envoyer des données spécifiques.
// Chaque fonction utilise l'API Fetch pour faire une requête et traite la réponse. Si la réponse n'est pas correcte (status code 200), une erreur est lancée.

export const getAnalysis = async (analysisID: string): Promise<Analysis> => {
  // récupère une analyse spécifique en fonction de l'ID fourni
  // l'URL de l'API inclut l'ID de l'analyse
  const response = await fetch(`http://[::1]:5000/analysis/${analysisID}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getTrainings = async (): Promise<TrainingArray> => {
  // Cette fonction récupère toutes les apprentissages
  const response = await fetch('http://[::1]:5000/trainings');

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getTraining = async (TrainingID: string): Promise<TrainingItem> => {
  // récupère un apprentissage spécifique en fonction de l'ID fourni
  const response = await fetch(`http://[::1]:5000/trainings/${TrainingID}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getLabelsCount = async (label: string): Promise<countObj> => {
  // récupère le nombre d'éléments pour un label spécifique.
  const response = await fetch(`http://[::1]:5000/data/count?label=${label}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getData = async (page: string = '1'): Promise<DataArray> => {
  // récupère toutes les données disponibles.
  // On pourrait cache et revalidate ici, les données ne changent pas d'après les données de l'API
  const response = await fetch(`http://[::1]:5000/data?page=${page}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getTrainingResult = async (TrainingID: string) => {
  // Cette fonction récupère le résultat d'un apprentissage spécifique
  const response = await fetch(`http://[::1]:5000/trainings/${TrainingID}/result`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getDataCount = async (): Promise<countObj> => {
  // récupère le nombre total de données.
  const response = await fetch('http://[::1]:5000/data/count');

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export async function postTrainingData(): Promise<TrainingItem> {
  // Cette fonction envoie une requête POST pour créer un nouveau apprentissage.
  // Si une erreur se produit pendant l'envoi de la requête, une erreur est lancée.
  try {
    const response = await fetch('http://[::1]:5000/trainings', {
      method: 'POST',
    });

    return response.json();
  } catch (error) {
    throw new Error("Erreur lors de création de l'apprentissage");
  }
}
