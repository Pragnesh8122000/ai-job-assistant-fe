import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskActivity } from "../../api/tasksApi";

export const ActivityLogDisplay = ({ taskId }) => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["activity", taskId],
    queryFn: () => fetchTaskActivity(taskId),
    enabled: !!taskId,
  });

  if (isLoading)
    return <div className="text-sm text-gray-500">Loading activity...</div>;
  if (!logs || logs.length === 0)
    return <div className="text-sm text-gray-500">No recent activity</div>;

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Activity Log</h3>
      <div className="space-y-3 max-h-40 overflow-y-auto">
        {logs.map((log) => (
          <div key={log._id} className="text-xs text-gray-600 flex flex-col">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">
                {log.performedBy?.name || "Unknown User"}
              </span>
              <span className="text-gray-400">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
            <div>{formatLogMessage(log)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatLogMessage = (log) => {
  switch (log.action) {
    case "TASK_CREATED":
      return `created task "${log.details.title}"`;
    case "STATUS_CHANGED":
      return `changed status from ${log.details.status?.from} to ${log.details.status?.to}`;
    case "TASK_REASSIGNED":
      return `reassigned task`;
    case "TASK_UPDATED":
      return "updated task details";
    case "TASK_DELETED":
      return "deleted task";
    default:
      return log.action;
  }
};
