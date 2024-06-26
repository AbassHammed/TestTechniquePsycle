'use client';

import React, { useEffect, useState } from 'react';

interface TopBarProps {
  TrainingName: string;
}

const TopBar: React.FC<TopBarProps> = ({ TrainingName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <header>
      <div className="flex justify-between items-center p-4 text-black text-sm">
        <span className="font-medium">{`Données > ${TrainingName}`}</span>
        <span>
          {time.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>
      </div>
      <div className="h-[1px] w-full bg-gray-200" />
    </header>
  );
};
export default TopBar;
