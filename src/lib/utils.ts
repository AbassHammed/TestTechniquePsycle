import { getTrainingResult, getTrainings } from '@/app/actions';
import { Analysis, TrainingResult } from '@/types';

/**
 * Returns an array of label names from an Analysis object.
 *
 * @param {Analysis} analysis - The Analysis object containing labels.
 * @return {string[]} An array of label names.
 */
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
