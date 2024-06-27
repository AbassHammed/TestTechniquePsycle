'use client';

import { useEffect, useState } from 'react';

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

export default CircularProgressBar;
