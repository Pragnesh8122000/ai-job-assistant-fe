import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, User } from "lucide-react";

export const TaskCard = React.memo(({ task, onClick, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isOverlay ? 0.8 : 1,
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`bg-white p-4 rounded shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow ${
        isOverlay ? "shadow-lg rotate-3 cursor-grabbing" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
      <h4 className="font-medium text-gray-900 mb-2 truncate">{task.title}</h4>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
        {task.assignee && (
          <div
            className="flex items-center gap-1"
            title={task.assignee.name || "Assignee"}
          >
            <User size={14} />
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden">
              {task.assignee.name ? task.assignee.name.charAt(0) : "U"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
