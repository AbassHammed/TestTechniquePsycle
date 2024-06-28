/*
Fonctions utilitaires.
getLablesNames: retourne un tableau des noms des labels d'une analyse.
getAllTrainingResultWithId: retourne un tableau de tous les résultats d'apprentissages (utile pour le barChart),

amelioration:
gestion des erreurs
*/

import { getTrainingResult, getTrainings } from '@/app/actions';
import { Analysis, TrainingResult } from '@/types';

export function getLablesNames(analysis: Analysis): string[] {
  const labelNames: string[] = [];

  const data = analysis.labels;

  for (const key in data) {
    labelNames.push(data[key].name);
  }

  return labelNames;
}

export async function getAllTrainingResultWithId() {
  const TrainingResults: TrainingResult[] = [];

  const Trainings = await getTrainings();

  for (let index = 0; index < Trainings.length; index++) {
    const TrainingResult = {
      id: Trainings[index].id,
      ...(await getTrainingResult(Trainings[index].id.toString())),
    };
    TrainingResults.push(TrainingResult);
  }

  return TrainingResults;
}
