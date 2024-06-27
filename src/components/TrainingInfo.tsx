'use client';

import React, { useState } from 'react';

import useTraining from '@/hooks/useTraining';

interface TrainingInfoProps {
  TrainingID: string;
}

const TrainingInfo: React.FC<TrainingInfoProps> = ({ TrainingID }) => {
  const { training } = useTraining(TrainingID);
  const [showLog, setShowLog] = useState(false);
  const logLines = training?.logs.split('\r');

  return (
    <div className="flex flex-col px-4 my-4 w-full">
      <div className="flex justify-between w-full">
        <span className="uppercase font-medium text-[10px]">aprrentissage en cours</span>
        <span className="font-medium text-[10px]">{`${training ? training.progress : '0'}%`}</span>
      </div>

      <div className="mt-1 bg-gray-200 rounded-md h-2.5 w-full">
        <div
          className="bg-blue-600 h-2.5 rounded"
          style={{ width: `${training ? training.progress : 0}%` }}></div>
      </div>

      <div className="flex relative my-3">
        <button
          className="absolute right-0 h-7 w-28 bg-gray-200 rounded justify-center items-center uppercase font-medium text-[10px] border border-gray-300"
          onClick={() => setShowLog(prev => !prev)}>
          {showLog ? 'cacher les logs' : 'afficher les logs'}
        </button>
      </div>

      {showLog && (
        <div className="flex items-center flex-col justify-start rounded-md bg-gray-200 mt-8 p-4">
          {logLines?.map((line, idx) => (
            <p
              className="text-left text-black font-medium text-sm w-full mb-1"
              key={`${line} - ${idx}`}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
export default TrainingInfo;
