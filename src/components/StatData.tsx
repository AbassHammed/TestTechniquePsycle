'use client';

import react from 'react';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

function TrainingItem() {
  return (
    <Link href={'#'} className="flex flex-row w-full h-[31px] bg-white text-[10px] font-medium items-center p-2">
      <div className="flex w-full justify-between">
        <div>
          <span>#1</span>
          <span className="mx-4">92%</span>
        </div>
        <div>12/01/2022 à 14h34</div>
      </div>
    </Link>
  );
}

export default function StatData() {
  return (
    <div className="flex-none h-full w-[265px] bg-[#eeeeee] px-6">
      <div className="flex flex-col items-start justify-start my-2 space-y-2">
        <h4 className="text-left uppercase font-medium text-[10px]">Statisques</h4>
        <h2 className="text-left font-medium text-xl">Détection d'acier</h2>
      </div>

      <div className="flex items-center justify-between my-10">
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <span className="uppercase text-[#9e9e9e] text-[10px]"> acier (total)</span>
          <h1 className="text-4xl">345</h1>
        </div>
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <span className="uppercase text-[#9e9e9e] text-[10px]"> autre (total)</span>
          <h1 className="text-4xl">213</h1>
        </div>
      </div>
      <TrainingItem />
      <CircularProgressBar progress={200} />
    </div>
  );
}

interface CircularProgressBarProps {
  progress: number;
  size?: number;
}

/**
 * Renders a circular progress bar component.
 *
 * @param {CircularProgressBarProps} props - The props for the component.
 * @param {number} props.progress - The progress of the bar, between 0 and 100.
 * @param {number} [props.size=20] - The size of the bar, in pixels.
 * @return {JSX.Element} The rendered circular progress bar component.
 */
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, size = 20 }) => {
  const [normalizedProgress, setNormalizedProgress] = useState(0);

  useEffect(() => {
    const validProgress = Math.max(0, Math.min(100, progress));
    setNormalizedProgress(validProgress);
  }, [progress]);

  const radius = (size - 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedProgress / 100) * circumference;
  const dashArray = `${circumference} ${circumference}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#eeeeee"
        strokeWidth={2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#597dfd"
        strokeWidth={2}
        strokeDasharray={dashArray}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};
