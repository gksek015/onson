'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('An error occurred:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
