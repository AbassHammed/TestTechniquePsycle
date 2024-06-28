'use client';

import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { getData } from '@/app/actions';
import { Annotation, DataArray, DataItem } from '@/types';

interface ImageCardProps {
  CardData: DataItem;
}

const ImageCard: FC<ImageCardProps> = ({ CardData }) => (
  <div className="flex flex-col justify-center items-center rounded bg-gray-200 w-[274px] h-[230px] p-1 space-y-1">
    <Image
      width={255}
      height={202}
      src={`http://localhost:5000/data/${CardData.id}/image`}
      alt={`${CardData.image.split('.')[0]} image`}
      className="rounded"
    />
    <div className="flex w-full justify-between items-center text-black text-sm font-medium px-2 uppercase">
      {CardData.annotations.map((annotation: Annotation) => (
        <span className="whitespace-nowrap leading-normal" key={annotation.annotation.name}>
          {annotation.annotation.name}
        </span>
      ))}
      <span>
        {new Date(CardData.created_at).toLocaleString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </span>
    </div>
  </div>
);

const ImageList = () => {
  const [data, setData] = useState<DataArray>([]);
  const [filter, setFilter] = useState<'all' | 'bonne' | 'cassée'>('all');
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    throw new Error(error.message);
  }

  const filteredData = data.filter(card => {
    if (filter === 'all') {
      return true;
    }
    return card.annotations.some(anno => anno.annotation.name === filter);
  });

  return (
    <div className="flex flex-col items-center space-y-3 w-full py-2">
      <div className="flex w-full justify-start items-center px-4 space-x-[2px]">
        <button
          className={`flex h-[35px] w-[55px] justify-center items-center rounded-sm ring-1 uppercase text-[10px] font-medium ${
            filter === 'bonne'
              ? 'ring-[#597dfd] bg-gray-200 text-[#597dfd]'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setFilter('bonne')}>
          bonne
        </button>
        <button
          className={`flex h-[35px] w-[55px] justify-center items-center rounded-sm ring-1 uppercase text-[10px] font-medium ${
            filter === 'cassée'
              ? 'ring-[#597dfd] bg-gray-200 text-[#597dfd]'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setFilter('cassée')}>
          cassée
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
        {filteredData.map(card => (
          <ImageCard key={card.id} CardData={card} />
        ))}
      </div>
    </div>
  );
};
export default ImageList;
