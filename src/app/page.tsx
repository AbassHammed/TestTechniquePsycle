'use client';

// import { useEffect } from 'react';

// import { useRouter } from 'next/navigation';

// import Loading from '@/app/loading';
import { MultiBarChart } from '@/components/graphique';

export default function Home() {
  // const { push } = useRouter();

  // useEffect(() => {
  //   push('/trainings');
  // }, []);
  return <MultiBarChart />;
}
