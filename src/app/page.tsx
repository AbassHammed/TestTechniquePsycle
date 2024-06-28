/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/app/loading';

// redirection sur le dernier apprentissage

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/trainings');
  }, []);

  return <Loading />;
}
