import Image from "next/image";
import { getMovieDetail } from "@/data/movieDetails";

function SimilarMovies({ movies }: { movies: any[] }) {
  return (
    <section className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4">More Like This</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[150px] max-w-[150px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              width={150}
              height={225}
              className="object-cover w-full h-[225px]"
            />
            <div className="p-2">
              <h4 className="text-white text-sm font-semibold truncate">
                {movie.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = getMovieDetail(parseInt(params.id));

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Movie Not Found
          </h1>
          <p className="text-gray-400">
            The movie you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Backdrop */}
      <div
        className="absolute inset-0 h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${movie.backdrop}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <Image
              src={movie.image}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-300 mb-4">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.rating}</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <span>{movie.genre}</span>
            </div>

            <p className="text-lg text-gray-300 mb-6 max-w-2xl">
              {movie.description}
            </p>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">
                <span className="text-white">Director:</span> {movie.director}
              </p>
              <p className="text-gray-400">
                <span className="text-white">Cast:</span>{" "}
                {movie.cast.join(", ")}
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <button className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition">
                Play
              </button>
              <button className="bg-gray-700/80 text-white font-bold px-8 py-3 rounded hover:bg-gray-600 transition">
                Add to My List
              </button>
              <button className="bg-gray-700/80 text-white font-bold px-8 py-3 rounded hover:bg-gray-600 transition">
                Download
              </button>
            </div>

            <SimilarMovies movies={movie.similar} />
          </div>
        </div>
      </div>
    </div>
  );
}
