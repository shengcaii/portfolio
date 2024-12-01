'use client'; // This directive marks the component as a client component

import { useRouter } from 'next/router';

const RefreshButton = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload(); // Reload the current route
  };

  return (
    <button onClick={handleRefresh} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Refresh
    </button>
  );
};

export default RefreshButton;