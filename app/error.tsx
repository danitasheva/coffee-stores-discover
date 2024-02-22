"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[600px] mx-auto mt-12 bg-slate-100 p-8 rounded-lg ">
      <h2 className="text-2xl mb-2">Something went wrong!</h2>
      <p className="mb-2 text-lg font-normal">
        Please configure your environment variables, check the Readme.md file.
      </p>
      <p className="mb-2 text-lg font-normal">
        Environment variables are MAPBOX_API, UNSPLASH_ACCESS_KEY,
        AIRTABLE_TOKEN. Please create them width values inside .env.local file.
      </p>
      <button
        className="mt-4"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
