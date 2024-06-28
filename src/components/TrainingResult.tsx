import React from 'react';

import { ConfusionMatrix, MultiBarChart, Recommendations } from './graphique';

type TrainingResultProps = {
  analysisID: string;
};

const TrainingResult: React.FC<TrainingResultProps> = ({ analysisID }) => {
  const [dataSet, setDataSet] = React.useState<'train_set' | 'validation_set'>('train_set');

  return (
    <div className="flex w-full items-center flex-row">
      <div className="flex flex-col justify-start items-start">
        <h2 className="flex font-medium text-[10px] text-black uppercase px-4 py-2">
          Résume de l&apos; apprentissage
        </h2>

        <MultiBarChart dataSet={dataSet} />
      </div>

      <div className="flex mx-10">
        <ConfusionMatrix analysisID={analysisID} dataSet={dataSet} setDataSet={setDataSet} />
      </div>

      <Recommendations analysisID={analysisID} />
    </div>
  );
};
export default TrainingResult;
