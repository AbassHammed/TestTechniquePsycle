/*

*/

'use client';

import React, { Dispatch, FC, useEffect, useState } from 'react';

import { getTrainingResult } from '@/app/actions';
import { getAllTrainingResultWithId } from '@/lib/utils';
import { TrainingResult } from '@/types';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

interface MultiBarChartProps {
  dataSet: 'train_set' | 'validation_set';
}

export const MultiBarChart: FC<MultiBarChartProps> = ({ dataSet }) => {
  const [trainingResults, setTrainingResults] = useState<TrainingResult[]>();

  useEffect(() => {
    const fetchTrainingResult = async () => {
      const data = await getAllTrainingResultWithId();
      setTrainingResults(data);
    };

    fetchTrainingResult();
  }, []);

  if (!trainingResults) {
    return <div className="w-[300px] h-[230px] bg-gray-200 animate-pulse rounded m-4"></div>;
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
      <BarChart width={300} height={230} data={data} className="p-0 m-0">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} tickFormatter={value => `${value}%`} />
        <Tooltip formatter={(value: number | string) => `${(value as number).toFixed(2)}%`} />
        <Bar dataKey="value" fill="#8884d8" stackId={dataSet} barSize={30} />
      </BarChart>
    </div>
  );
};

interface ConfusionMatrixProps {
  analysisID: string;
  setDataSet: Dispatch<React.SetStateAction<'train_set' | 'validation_set'>>;
  dataSet: 'train_set' | 'validation_set';
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({
  analysisID,
  dataSet,
  setDataSet,
}) => {
  const [trainingResult, setTrainingResult] = useState<TrainingResult>();

  useEffect(() => {
    const fetchTrainingResult = async () => {
      const data = await getTrainingResult(analysisID);
      setTrainingResult(data);
    };

    fetchTrainingResult();
  }, [analysisID]);

  if (!trainingResult) {
    return <div className="w-[300px] h-[230px] bg-gray-200 animate-pulse rounded m-4"></div>;
  }

  const data = {
    labels: trainingResult[dataSet].classes,
    matrix: trainingResult[dataSet].confusion_matrix,
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-muted-foreground -mr-4">
          Annotations
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 rotate-[-90deg] text-muted-foreground -mr-4">
          Prédictions
        </div>
        <table className="border-collapse border">
          <thead>
            <tr>
              <th className="border p-2" />
              <th className="border p-2">
                <div className="inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold bg-[#007bff] text-white uppercase">
                  {data.labels[0]}
                </div>
              </th>
              <th className="border p-2">
                <div className="inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold  bg-[#ffcccb] text-black uppercase">
                  {data.labels[1]}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                <div className="inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold bg-[#007bff] text-white rotate-[-90deg] uppercase my-4">
                  {data.labels[0]}
                </div>
              </td>
              <td className="border p-4 text-center text-2xl font-bold">{data.matrix[0][0]}</td>
              <td className="border p-4 text-center text-2xl font-bold">{data.matrix[0][1]}</td>
            </tr>
            <tr>
              <td className="border p-2">
                <div className="inline-flex items-center rounded-sm border px-2.5 py-0.5  text-xs font-semibold bg-[#ffcccb] text-black rotate-[-90deg] uppercase my-2">
                  {data.labels[1]}
                </div>
              </td>
              <td className="border p-4 text-center text-2xl font-bold">{data.matrix[1][0]}</td>
              <td className="border p-4 text-center text-2xl font-bold">{data.matrix[1][1]}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <select
            value={dataSet}
            onChange={e => setDataSet(e.target.value as 'train_set' | 'validation_set')}>
            <option value="train_set">Train Set</option>
            <option value="validation_set">Validation Set</option>
          </select>
        </div>
      </div>
    </div>
  );
};
