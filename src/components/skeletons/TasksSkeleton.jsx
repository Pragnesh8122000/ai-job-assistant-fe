import React from "react";

export const TasksSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4 h-[calc(100vh-200px)] animate-pulse">
      {[1, 2, 3].map((column) => (
        <div
          key={column}
          className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-8 bg-gray-200 rounded-full"></div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white p-4 rounded shadow-sm border border-gray-100 h-32"
              >
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between mt-8">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
