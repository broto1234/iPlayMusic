"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SpotifySearch() {
  const searchParams = useSearchParams();
  const trackName = searchParams.get('track');
  const artistName = searchParams.get('artist');
  
  const initialQuery = trackName && artistName 
    ? `${trackName} ${artistName}` 
    : trackName || artistName || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDuration = (durationMs) => {
    if (durationMs === null || durationMs === undefined) return "0:00";
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Auto-search when query params are provided
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, []);

  async function performSearch(searchQuery) {
    if (!searchQuery) {
      setResults(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      
      console.log("Search response:", data);
      
      if (!res.ok) {
        setError(data.error || "Failed to search");
        setResults(null);
      } else {
        setResults(data);
        setError(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search: " + err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    const q = e.target.value;
    setQuery(q);
    performSearch(q);
  }

  return (
    <div className="max-w-xl mx-auto p-2">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search Spotify..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <div className="mt-6 space-y-4">
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {loading && (
          <p className="text-gray-500 text-center">Searching...</p>
        )}

        {results?.tracks?.items?.length > 0 && (
          <>
            {results.tracks.items.map((track) => (
              (() => {
                const durationLabel = formatDuration(track.duration_ms);
                const imageUrl =
                  track.album.images?.[1]?.url ||
                  track.album.images?.[2]?.url ||
                  track.album.images?.[0]?.url ||
                  "";
                return (
              <Link 
                key={track.id} 
                href={`/search/${encodeURIComponent(track.id)}?track=${encodeURIComponent(track.name)}&artist=${encodeURIComponent(track.artists.map((a) => a.name).join(", "))}&duration=${encodeURIComponent(durationLabel)}&image=${encodeURIComponent(imageUrl)}`}
                className="space-x-1 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-full mx-auto flex justify-between items-center gap-2">
                  <div className="flex gap-2">
                    {imageUrl && (
                    <img
                      src={imageUrl}
                      width={64}
                      height={64}
                      alt={track.name}
                      className="rounded"
                    />
                    )}
                    <div className="text-xs">
                      <p className="font-semibold">{track.name}</p>
                      <p className="text-gray-500">
                        {track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{durationLabel}</p>
                </div>
              </Link>
                );
              })()
            ))}
          </>
        )}

        {results && !results?.tracks?.items?.length && !loading && (
          <p className="text-gray-500 text-center">No results found</p>
        )}
      </div>
    </div>
  );
}
