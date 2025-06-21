"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { contentAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { XCircle } from "lucide-react";

interface WatchlistItem {
  id: number;
  movie?: {
    id: number;
    title: string;
    poster_url: string;
  };
  tv_show?: {
    id: number;
    title: string;
    poster_url: string;
  };
}

export default function MyListPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated) {
      const fetchWatchlist = async () => {
        try {
          setLoading(true);
          const data = await contentAPI.getWatchlist();
          setWatchlist(data.results || []);
        } catch (err) {
          setError("Failed to fetch your list. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchWatchlist();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleRemove = async (watchlistItemId: number) => {
    // Optimistically update the UI
    const originalWatchlist = [...watchlist];
    setWatchlist(watchlist.filter((item) => item.id !== watchlistItemId));

    try {
      await contentAPI.removeFromWatchlist(watchlistItemId);
    } catch (err) {
      setError("Failed to remove item. Please try again.");
      // Revert the UI if the API call fails
      setWatchlist(originalWatchlist);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl animate-pulse">Loading My List...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">My List</h1>
      {watchlist.length === 0 ? (
        <p>Your list is empty. Add some movies and TV shows!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {watchlist.map((item) => {
            const content = item.movie || item.tv_show;
            if (!content) return null;

            return (
              <div key={item.id} className="group relative">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={content.poster_url}
                    alt={content.title}
                    width={500}
                    height={750}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h3 className="font-bold text-lg">{content.title}</h3>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition"
                      title="Remove from My List"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
