import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, ExternalLink, Briefcase } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
  const { user } = useAuth();
  const [keywords, setKeywords] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial fetch or previously saved jobs could go here
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchKeywords = "") => {
    setLoading(true);
    setError(null);
    try {
      // Use config from ENV or default
      const baseUrl = "http://localhost:5000";
      const url = searchKeywords
        ? `${baseUrl}/api/jobs?keywords=${encodeURIComponent(searchKeywords)}`
        : `${baseUrl}/api/jobs/list`; // Fallback to list if no keywords for now

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(keywords);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Job Finder Engine
          </h1>
          <p className="text-gray-600">
            Find the best tech jobs from across the web. Verified. Scored.
            Direct Links.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center shadow-lg rounded-xl overflow-hidden bg-white border border-gray-200 p-2"
          >
            <Search className="absolute left-6 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Enter keywords (e.g. Node.js, React, Remote, Backend)..."
              className="w-full pl-14 pr-4 py-3 text-lg outline-none text-gray-700 placeholder-gray-400"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Searching..." : "Find Jobs"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Job Results Grid */}
        <div className="grid grid-cols-1 gap-6">
          {jobs.length === 0 && !loading ? (
            <div className="text-center py-20 text-gray-500">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl">
                No jobs found yet. Try searching for keywords!
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id || job.link}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex justify-between items-start group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h2>
                    {/* Score Badge */}
                    {job.score > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          job.score >= 30
                            ? "bg-green-100 text-green-700"
                            : job.score >= 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        Score: {job.score}
                      </span>
                    )}
                    {job.status === "new" && (
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {/* Placeholder for description if we scrape it later */}
                    Found via Google Index. Click verify and apply directly on
                    the company site.
                  </p>
                  <p className="text-xs text-gray-400">
                    Fetched:{" "}
                    {new Date(
                      job.fetchedAt || job.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all ml-4"
                >
                  <span>Apply</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
