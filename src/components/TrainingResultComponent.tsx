/*
Le diagramme en barre, la matrice de confusion et les recommandations.
*/

'use client';

import React, { Dispatch, FC, useEffect, useState } from 'react';

import { getDataCount, getTrainingResult } from '@/app/actions';
import { getAllTrainingResultWithId } from '@/lib/utils';
import { TrainingResult } from '@/types';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

interface MultiBarChartProps {
  dataSet: 'train_set' | 'validation_set';
}

const MultiBarChart: FC<MultiBarChartProps> = ({ dataSet }) => {
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

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ analysisID, dataSet, setDataSet }) => {
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
    <div className="flex flex-col items-center justify-center p-4 gap-8">
      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full font-medium text-[#9e9e9e] text-[10px] -mr-4">
          Annotations
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 rotate-[-90deg] font-medium text-[#9e9e9e] text-[10px] -mr-4">
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
          <span>Données :</span>
          <select
            value={dataSet}
            onChange={e => setDataSet(e.target.value as 'train_set' | 'validation_set')}>
            <option value="train_set">Test</option>
            <option value="validation_set">Validation</option>
          </select>
        </div>
      </div>
    </div>
  );
};

interface RecommendationProps {
  analysisID: string;
}
const Recommendations: React.FC<RecommendationProps> = ({ analysisID }) => {
  const [data, setData] = useState({ count: 0, TFalsePositive: 0, VFalsePostive: 0 });
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataCount();
        const trainingResult: TrainingResult = await getTrainingResult(analysisID);
        setData({
          count: res.count,
          TFalsePositive: trainingResult.train_set.confusion_matrix[0][1],
          VFalsePostive: trainingResult.validation_set.confusion_matrix[0][1],
        });
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [analysisID]);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">RECOMMENDATIONS</h3>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Les données de test sont à revoir :</strong>{' '}
          {`sur ${data.count} données de test, ${data.TFalsePositive} données
          bonnes ont été identifiées mauvaises par l'algorithme.`}
        </li>
        <li className="mb-2">
          <strong>Les données d&apos;entrainement sont à revoir :</strong>{' '}
          {`sur ${data.count} données de validation, ${data.VFalsePostive}
         données bonnes ont été identifiées mauvaises par l'algorithme.`}
        </li>
      </ul>
    </div>
  );
};

export { ConfusionMatrix, MultiBarChart, Recommendations };
