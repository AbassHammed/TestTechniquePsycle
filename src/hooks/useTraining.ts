/*
Le hook useTraining permet de récupérer les informations d'un apprentissage en cours.
Il prend en paramètre l'identifiant de l'apprentissage et retourne un objet contenant
les informations (TrainingItem cf. types/index.ts) de l'apprentissage, l'état de chargement et les éventuelles erreurs.
Le hook effectue une requête à l'API à intervalles réguliers pour mettre à jour les informations de l'apprentissage.

amelioration:
on devrait avoir un moyen d'arrêter de faire une requête toutes les 1 secondes une fois que l'apprentissage est fini
*/

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
      } catch (err) {
        setError(err as Error);
      } finally {
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
