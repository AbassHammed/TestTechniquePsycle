/*
Le hook useTrainings permet de récupérer les informations de toutes les apprentissages.
Il retourne un objet contenant les informations (TrainingArray cf. types/index.ts) des apprentissages,
l'état de chargement et les éventuelles erreurs.
Le hook effectue une requête à l'API toutes les 1 secondes pour mettre à jour les informations des apprentissages.
 */

'use client';

import { useEffect, useState } from 'react';

import { TrainingArray } from '@/types';

const POLLING_INTERVAL = 1000; // 1 second

const useTrainings = () => {
  const [trainings, setTrainings] = useState<TrainingArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/trainings');
        const data = await response.json();
        setTrainings(data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchTrainings();

    const intervalId = setInterval(() => {
      fetchTrainings();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return { trainings, loading, error };
};

export default useTrainings;
