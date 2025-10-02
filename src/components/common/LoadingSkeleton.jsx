'use client';

export default function LoadingSkeleton({ type = 'message', count = 3 }) {
  if (type === 'message') {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                index % 2 === 0
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'bg-blue-200 dark:bg-blue-900'
              } animate-pulse`}
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chatroom') {
    return (
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="p-4 animate-pulse">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}