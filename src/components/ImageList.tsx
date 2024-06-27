'use client';

import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { getData } from '@/app/actions';
import { Annotation, DataArray, DataItem } from '@/types';

type ImageListProps = {};

const ImageList: React.FC<ImageListProps> = () => {
  const [data, setData] = useState<DataArray>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center space-y-3 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
        {data.map(card => (
          <ImageCard key={card.id} CardData={card} />
        ))}
      </div>
    </div>
  );
};
export default ImageList;

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
    <div className="flex justify-between items-center text-black text-sm font-medium">
      {CardData.annotations.map((annotation: Annotation, idx) => (
        <span key={idx}>{annotation.annotation.name}</span>
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
