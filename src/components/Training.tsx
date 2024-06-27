'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CircularProgressBar } from '@/components';
import { TrainingItem } from '@/types';

export default function Training({ Training }: Readonly<{ Training: TrainingItem }>) {
  const pathname = usePathname();
  const href = `/trainings/${Training.id}`;
  const isActive = href === pathname;

  /**
   * Formats a given date string into a formatted date and time string.
   *
   * @param {string} dateStr - The date string to be formatted.
   * @return {string} The formatted date and time string in the format "DD/MM/YYYY à HHhMM".
   */
  function formatDatetime(dateStr: string): string {
    const dateObj = new Date(dateStr);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}h${minutes}`;
  }

  return (
    <Link
      href={href}
      className={`flex flex-row w-full h-[31px]  text-[11px] ${isActive ? 'ring-1 ring-[#597dfd]' : ''} bg-white font-medium items-center p-2 rounded`}>
      <div className="flex w-full justify-between">
        <div className="flex flex-row">
          <span>{`#${Training.id}`}</span>
          <div className="flex flex-row mx-2 space-x-1 justify-center items-center">
            {!isActive && <CircularProgressBar size={12} progress={Training.progress} />}
            <span
              className={`${isActive ? 'text-black' : 'text-[#9e9e9e]'}`}>{`${Training.progress}%`}</span>
          </div>
        </div>
        <div>{formatDatetime(Training.created_at)}</div>
      </div>
    </Link>
  );
}
