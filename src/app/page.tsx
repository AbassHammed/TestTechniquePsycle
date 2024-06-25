'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/app/loading';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/trainings');
  }, []);
  return <Loading />;
}
