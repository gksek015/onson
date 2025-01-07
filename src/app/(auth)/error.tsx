'use client';

import { useRouter } from 'next/navigation';

import { startTransition, useEffect } from 'react';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const { refresh } = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={() =>
          startTransition(() => {
            refresh();
            reset();
          })
        }
      >
        Try again
        <div>{error.message}</div>
      </button>
    </div>
  );
};

export default Error;
