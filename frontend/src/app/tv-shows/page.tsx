import Image from "next/image";
import {
  tvShows,
  getTVShowsByGenre,
  getPopularTVShows,
  getTrendingTVShows,
} from "@/data/tvShows";

function TVShowCarousel({
  title,
  shows,
}: {
  title: string;
  shows: typeof tvShows;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 px-2">
        {shows.map((show) => (
          <div
            key={show.id}
            className="min-w-[180px] max-w-[180px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src={show.image}
              alt={show.title}
              width={180}
              height={270}
              className="object-cover w-full h-[270px]"
            />
            <div className="p-2">
              <h3 className="text-white text-base font-semibold truncate">
                {show.title}
              </h3>
              <p className="text-gray-400 text-sm">{show.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TVShowsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
      <h1 className="text-4xl font-bold text-white mb-8">TV Shows</h1>

      <TVShowCarousel title="Popular TV Shows" shows={getPopularTVShows()} />
      <TVShowCarousel title="Trending Now" shows={getTrendingTVShows()} />
      <TVShowCarousel title="Drama Series" shows={getTVShowsByGenre("Drama")} />
      <TVShowCarousel
        title="Sci-Fi & Fantasy"
        shows={getTVShowsByGenre("Sci-Fi").concat(getTVShowsByGenre("Fantasy"))}
      />
      <TVShowCarousel
        title="Crime & Thriller"
        shows={getTVShowsByGenre("Crime").concat(getTVShowsByGenre("Thriller"))}
      />
    </div>
  );
}
