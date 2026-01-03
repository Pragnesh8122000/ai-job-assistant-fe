import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const TaskColumn = ({ id, title, count, children }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">{children}</div>
    </div>
  );
};
