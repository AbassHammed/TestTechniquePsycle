'use client';

import { FC, useEffect, useState } from 'react';

import { getAnalysis, getLabelsCount } from '@/app/actions';
import Training from '@/components/Training';
import useTrainings from '@/hooks/useTrainings';
import { getLablesNames } from '@/lib/utils';
import { Analysis } from '@/types';

interface StatDataProps {
  analysisID: string;
}

const StatData: FC<StatDataProps> = ({ analysisID }) => {
  const { trainings } = useTrainings();
  const [analysis, setAnalysis] = useState<Analysis>();
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>(['']);
  const [labelCount, setLabelCount] = useState({ first: 0, second: 0 });

  useEffect(() => {
    const fetchAnalysis = async () => {
      const data = await getAnalysis(analysisID);
      setAnalysis(data);
      setLabels(getLablesNames(data));
    };

    fetchAnalysis();
  }, [analysisID]);

  useEffect(() => {
    const fetchCount = async () => {
      if (labels.length >= 2) {
        const firstLabel = await getLabelsCount(labels[0]);
        const secondLabel = await getLabelsCount(labels[1]);

        setLabelCount({ first: firstLabel.count, second: secondLabel.count });
      }
      setIsLoading(false);
    };

    fetchCount();
  }, [labels]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-none sticky h-screen top-0 right-0 overflow-y-auto w-[265px] bg-[#eeeeee] px-6">
      <div className="flex flex-col items-start justify-start my-2 space-y-2">
        <h4 className="text-left uppercase font-medium text-[10px]">Statisques</h4>
        <h2 className="text-left font-medium text-xl">{analysis?.name}</h2>
      </div>

      <div className="flex items-center justify-between my-10">
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <span className="uppercase text-[#9e9e9e] text-[10px]"> {`${labels[0]} (total)`}</span>
          <h1 className="text-4xl">{labelCount.first}</h1>
        </div>
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <span className="uppercase text-[#9e9e9e] text-[10px]"> {`${labels[1]} (total)`}</span>
          <h1 className="text-4xl">{labelCount.second}</h1>
        </div>
      </div>

      <div className="flex flex-col font-medium w-full space-y-2">
        <h1 className="flex text-left text-[#9e9e9e] text-[10px] uppercase">apprentissages</h1>
        {trainings.map(item => (
          <Training key={item.id} Training={item} />
        ))}
      </div>

      <div className="flex inset-x-6 bottom-0 my-4 absolute">
        <button
          disabled={trainings[trainings.length - 1]?.progress < 100}
          className="flex h-[35px] w-full justify-center items-center rounded bg-[#597dfd] uppercase text-[12px] font-medium text-white">
          lancer un apprentissage
        </button>
      </div>
    </div>
  );
};

export default StatData;

function Loading() {
  return (
    <div className="flex-none relative h-full w-[265px] bg-gray-200 animate-pulse">
      <div className="flex flex-col items-start justify-start p-4 space-y-2">
        <div className="h-4 bg-gray-300 w-24 rounded" />
        <div className="h-7 bg-gray-300 w-60 rounded" />
      </div>

      <div className="flex items-center justify-between my-10 px-4">
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <div className="h-4 bg-gray-300 w-16 rounded" />
          <div className="h-16 bg-gray-300 w-16 rounded" />
        </div>
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <div className="h-4 bg-gray-300 w-16 rounded" />
          <div className="h-16 bg-gray-300 w-16 rounded" />
        </div>
      </div>

      <div className="flex flex-col w-full space-y-2 p-4">
        <div className="flex w-24 h-6 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
        <div className="flex w-60 h-8 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
