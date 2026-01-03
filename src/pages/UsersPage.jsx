import React from "react";

export const UsersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          User Management
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">User management coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">
            This page is only accessible to Admin and Manager roles.
          </p>
        </div>
      </div>
    </div>
  );
};
