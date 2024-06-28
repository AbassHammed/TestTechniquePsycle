'use client';

import React, { useEffect, useState } from 'react';

import { getAllTrainingResultWithId } from '@/lib/utils';
import { TrainingResult } from '@/types';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export function MultiBarChart() {
  const [dataSet, setDataSet] = useState<'train_set' | 'validation_set'>('train_set');
  const [trainingResults, setTrainingResults] = useState<TrainingResult[]>();

  useEffect(() => {
    const fetchTrainingResult = async () => {
      const data = await getAllTrainingResultWithId();
      setTrainingResults(data);
    };

    fetchTrainingResult();
  }, []);

  if (!trainingResults) {
    return <div>Loading</div>;
  }

  const data = trainingResults.map(analysis => {
    const selectedSet = analysis[dataSet];
    const classScores = selectedSet ? selectedSet['f1-score'] : [];
    const averageF1Score =
      classScores.length > 0 ? classScores.reduce((a, b) => a + b, 0) / classScores.length : 0;

    return {
      name: `#${analysis.id}`,
      value: averageF1Score * 100,
    };
  });

  return (
    <div>
      <select
        value={dataSet}
        onChange={e => setDataSet(e.target.value as 'train_set' | 'validation_set')}>
        <option value="train_set">Train Set</option>
        <option value="validation_set">Validation Set</option>
      </select>

      <BarChart width={300} height={230} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} tickFormatter={value => `${value}%`} />
        <Tooltip formatter={(value: number | string) => `${(value as number).toFixed(2)}%`} />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" stackId={dataSet} barSize={30} />
      </BarChart>
    </div>
  );
}
