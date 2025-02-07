'use client';

import Image from 'next/image';
import Link from 'next/link';

// UI affiché lorsqu'une erreur est détectée dans l'application.
export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto flex-1 flex-row-reverse gap-12 items-center justify-between md:max-w-none md:flex">
          <div className="flex-1 max-w-lg">
            <Image src="/404.svg" alt="" width={500} height={500} priority />
          </div>
          <div className="mt-12 flex-1 max-w-lg space-y-3 md:mt-0">
            <h3 className="text-indigo-600 font-semibold">500 (Internal Server Error)</h3>
            <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">Page non trouvée</p>
            <p className="text-gray-600">{error.message}</p>
            <Link
              href="/"
              className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
              Retour à l&apos;accueil
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
