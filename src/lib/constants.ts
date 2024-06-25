import { TrainingItem } from '@/types';

export const BackendUrl = 'http://localhost:5000/';

export const Test: TrainingItem = {
  id: 1,
  name: 'Apprentissage numéro #1',
  created_at: '2024-06-25T19:07:47.629578',
  progress: 100,
  logs: "Début de l'apprentissage\rProgression: 14%\rProgression: 21%\rProgression: 32%\rProgression: 45%\rProgression: 51%\rProgression: 64%\rProgression: 76%\rProgression: 87%\rProgression: 100%\rFin de l'apprentissage",
  analysis_id: 1,
  train_set: [
    8, 76, 38, 56, 1, 28, 77, 80, 55, 19, 85, 81, 61, 96, 49, 18, 46, 32, 17, 73, 16, 72, 74, 29,
    68, 40, 25, 45, 84, 7, 6, 44, 82, 50, 54, 92, 70, 2, 39, 13, 58, 90, 48, 51, 88, 83, 22, 86, 64,
    57, 52, 37, 47, 66, 36, 89, 14, 65, 9, 12,
  ],
  validation_set: [95, 60, 21, 100, 94, 35, 24, 30, 42, 69, 75, 93, 34, 11, 59, 31, 78, 41, 67, 23],
};
